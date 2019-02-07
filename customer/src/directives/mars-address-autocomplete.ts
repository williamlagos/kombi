/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Address autocomplete directive.
 */

import { Input, Output, Directive, ChangeDetectorRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { AppGlobals } from "@app/app.globals";

declare var google;

@Directive({
    selector: "[mars-address-autocomplete]"
})
export class MarsAddressAutocompleteDirective {

    MAX_RADIUS = 100000;
    ELEMENT_INITIALIZATION_DELAY = 2000;

    @Input("mars-address-autocomplete") uniqueId: string;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    @Input("options") options: any = {};
    @Input("global-location") isGlobalLocation: any = {};

    static DEFAULT_KEY_MAPPING = {
        "formatted_address": "vicinity",
        "street": "street",
        "street_number": "number",
        "sublocality_level_1": "neighbourhood",
        "administrative_area_level_2": "city",
        "postal_code": "postalCode",
        "administrative_area_level_1": "state",
        "country": "country"
    };

    constructor(public globals: AppGlobals, public changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        setTimeout(() => {
            let inputId = this.uniqueId;
            let div = document.querySelector(`[mars-address-autocomplete=${inputId}]`);
            if (!div)
                console.warn(MarsAddressAutocompleteDirective.name + ": Whoops! We were unable to find any divs with the id provided :(");
            let divIsAnInput = div && div.nodeName == "INPUT";
            let input: any = divIsAnInput ? div : (document.querySelector(`[mars-address-autocomplete=${inputId}] input`));
            if (!input)
                console.warn(MarsAddressAutocompleteDirective.name + ": Whoops! Be sure to add the directive only to inputs or divs with input children ;)");
            this.generateAutocompleteInput(input);
        }, this.ELEMENT_INITIALIZATION_DELAY);
    }

    async generateAutocompleteInput(input) {
        let coordinates;
        try {
            coordinates = await this.getUserLocation();
        } catch (e) {
            console.warn(e);
        } finally {
            this.changeDetector.detectChanges();
            if (coordinates) { /* In case the coordinates were obtained successfully */
                let autocomplete = new google.maps.places.Autocomplete(input, this.options);
                let circle = new google.maps.Circle({
                    center: <google.maps.LatLng>coordinates,
                    radius: this.options.radius || this.MAX_RADIUS
                });
                autocomplete.setBounds(circle.getBounds());
                autocomplete.addListener("place_changed", () => {
                    let place = autocomplete.getPlace();
                    let address = this.parseAddress(place);
                    if (this.isGlobalLocation) this.globals.currentAddress = address;
                    this.onSelect.emit({ place: place, address: address });
                });
            }
        }
    }

    async getUserLocation() {
        return new Promise((resolve, reject) => {
            window.navigator.geolocation.getCurrentPosition((location) => {
                resolve(this.getLatLngFrom(location));
            }, (err) => {
                reject(err);
            });
        });
    }

    getLatLngFrom(location) {
        // In case we retrieve the location successfully, we must wrap it on a google maps friendly way.
        let coordinates = typeof google !== "undefined" ? new google.maps.LatLng(location.coords.latitude, location.coords.longitude) : this.createFallbackCoordinates(location);
        return coordinates;
    }

    createFallbackCoordinates(nativeCoordinates) {
        nativeCoordinates.lat = function () {
            return this.coords.latitude;
        }
        nativeCoordinates.lng = function () {
            return this.coords.longitude;
        }
        return nativeCoordinates;
    }

    static getAddressElement(gmapsAddressComponent: Array<any>, addressComponentCode: string) {
        let value;
        gmapsAddressComponent.map((element) => {
            if (element.types && element.types.indexOf && (element.types.indexOf(addressComponentCode) > -1))
                value = element.short_name || element.long_name;
        });
        return value;
    }

    static getPlaceLatLng(place: google.maps.places.PlaceResult) {
        return {
            lng: place.geometry.location.lng(),
            lat: place.geometry.location.lat()
        };
    }

    static getAddressFromPlace(place: google.maps.places.PlaceResult, keyMapping?: any) {
        if (!place || !place.geometry) {
            console.warn(MarsAddressAutocompleteDirective.name + ": Whoops! It looks like the geometry property is missing from this place.");
            return false;
        }
        let address: any = {};
        let addressKeys = keyMapping || MarsAddressAutocompleteDirective.DEFAULT_KEY_MAPPING;
        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (let i = 0; i < place.address_components.length; i++) {
            let infoType = place.address_components[i].types[0];
            let infoIsRequired = addressKeys[infoType];
            if (infoIsRequired) {
                let infoValue = place.address_components[i]["long_name"];
                address[addressKeys[infoType]] = infoValue;
            }
        }
        address.vicinity = place.formatted_address;
        return address;
    }

    parseAddress(place: google.maps.places.PlaceResult) {
        if (!place) return {};
        let rawAddress = place.address_components;
        let address: any = {};
        /* Parses address */
        address.streetNumber = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "street_number");
        address.location = MarsAddressAutocompleteDirective.getPlaceLatLng(place);
        address.street = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "route");
        address.number = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "street_number");
        address.neighbourhood = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "sublocality");
        address.city = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "administrative_area_level_2");
        address.state = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "administrative_area_level_1");
        address.country = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "country");
        address.postalCode = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "postal_code");
        if (address.streetNumber) address.street = address.street + ", " + address.streetNumber;
        return address;
    }
}