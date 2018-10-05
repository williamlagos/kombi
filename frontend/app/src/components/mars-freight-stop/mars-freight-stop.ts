/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Freight stop component.
 */

import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { MarsAddressAutocompleteDirective } from '@directives/mars-address-autocomplete';
import { AppLocales } from '@app/app.locales';

@Component({
    selector: 'mars-freight-stop',
    templateUrl: 'mars-freight-stop.html'
})
export class MarsFreightStopComponent {
    @Input("stopIndex") stopIndex: number;
    @Input("is-origin") isOrigin: number;
    @Input("is-destination") isDestination: number;
    @Input("stop-title") title: any;
    @Input("stop") stop: any;

    @Output() onNewStopClick: EventEmitter<any> = new EventEmitter();
    @Output() onDestinationClick: EventEmitter<any> = new EventEmitter();
    showAddressSpinner: boolean = false;
    uuid: string;
    translations: AppTranslations;

    constructor(public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales) { }

    ngOnInit() {
        this.uuid = this.getUniqueIdOf(10);
        this.translations = this.locales.load();
    }

    onStopAddressSelected($event, index) {
        this.showAddressSpinner = false;
        let place: google.maps.places.PlaceResult = $event.place;
        let address: any = {};
        /* let address: any = MarsAddressAutocompleteDirective.getAddressFromPlace(place);*/
        this.zone.run(() => {
            let rawAddress = place.address_components;
            let streetNumber = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "street_number");
            if (!streetNumber) return alert("Ops! Por favor, informe o endereço com número ;)");

            /* Parses address */
            address.location = MarsAddressAutocompleteDirective.getPlaceLatLng(place);
            address.street = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "route") + ", " + streetNumber;
            address.number = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "street_number");
            address.neighbourhood = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "sublocality");
            address.city = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "administrative_area_level_2");
            address.state = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "administrative_area_level_1");
            address.country = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "country");
            address.postalCode = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "postal_code");
            this.stop.address = address;
            this.changeDetector.detectChanges();
        });
    }

    addItem() {
        this.stop.items.push({ description: '', quantity: 1 });
    }

    removeItem(itemIndex) {
        this.stop.items.splice(itemIndex, 1);
    }

    getUniqueIdOf(numberOfChars) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < numberOfChars; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text.toUpperCase();
    };

}
