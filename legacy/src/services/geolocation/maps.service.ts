/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Map management service.
 */

import { Injectable } from "@angular/core";

import { Platform } from "@ionic/angular";

import { AppGlobals } from "@app/app.globals";

import { MarsAuthService } from "@auth.service";

import { MarsGeolocationService } from "./geolocation.service";
import { MarsMapMarkerService } from "./marker.service";
import { MarsViewService } from "@view.service";
import { AppConstants } from "@app/app.constants";

let apple_map_styles = <google.maps.MapTypeStyle[]>[{ "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "color": "#faf5ed" }, { "lightness": "0" }, { "gamma": "1" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#bae5a6" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "weight": "1.00" }, { "gamma": "1.8" }, { "saturation": "0" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ffb200" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "lightness": "0" }, { "gamma": "1" }] }, { "featureType": "transit.station.airport", "elementType": "all", "stylers": [{ "hue": "#b000ff" }, { "saturation": "23" }, { "lightness": "-4" }, { "gamma": "0.80" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#a0daf2" }] }];

@Injectable()
export class MarsMapsService {

    userLocationMarker: google.maps.Marker;
    currentMarkerCoordinates;
    currentMarkerLocation;
    currentMarker;
    static ALREADY_RENDERED_MARKERS = "alreadyRenderedMarkers";

    constructor(private platform: Platform,
        private globals: AppGlobals,
        private geolocationService: MarsGeolocationService,
        private markerService: MarsMapMarkerService) { }

    getMap(mapElement: HTMLElement, options?, callback?: Function) {
        return new Promise(async (resolve, reject) => {
            MarsGeolocationService.onLoad(async () => {
                let map = await this.instanceMap(mapElement, options);
                resolve(map);
            });
        });
    }

    getMapForService(uniqueId: string) {
        return new Promise(async (resolve, reject) => {
            let mapElement = document.createElement("div");
            mapElement.id = uniqueId;
            mapElement.style.display = "none";
            document.body.appendChild(mapElement);
            let map = await this.getMap(mapElement, { ignoreUserLocation: true });
            resolve(map);
        });
    }

    async instanceMap(mapElement: HTMLElement, options: any) {
        return new Promise(async (resolve, reject) => {
            let mapOptions: google.maps.MapOptions = Object.assign(options, {
                disableDefaultUI: options.disableDefaultUI ? options.disableDefaultUI : false,
                overviewMapControl: false,
                mapTypeControl: false,
                scaleControl: false,
                fullscreenControl: false,
                zoom: 2
            });

            if (this.platform.is("ios"))
                mapOptions.styles = apple_map_styles;

            let customPolylineOptions = new google.maps.Polyline({
                strokeOpacity: 0.8,
                strokeWeight: 5
            });

            if (mapElement == null) {
                console.warn(MarsMapsService.name + ": Map div not found. Please, check the id provided: " + mapElement);
                return;
            };
            let map = new google.maps.Map(mapElement, mapOptions);
            map.set(MarsMapsService.ALREADY_RENDERED_MARKERS, {});
            setTimeout(() => {
                map.setCenter(new google.maps.LatLng(0, 0));
            }, 200);

            if (!options.ignoreUserLocation) {
                if (!mapOptions.disableDefaultUI)
                    this.addMyLocationController(map);

                this.geolocationService.getUserLocation({}, (position) => {
                    this.updateUserLocationOn(map, position);
                    map.setCenter(position as any);
                    map.setZoom(15 || options.zoom);
                });
            }
            resolve(map);
        });
    }

    addMyLocationController(map) {
        let control = document.createElement("div");
        let targetButton = document.createElement("button");
        targetButton.style.backgroundColor = "#fff";
        targetButton.style.border = "none";
        targetButton.style.outline = "none";
        targetButton.style.width = "28px";
        targetButton.style.height = "28px";
        targetButton.style.borderRadius = "2px";
        targetButton.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
        targetButton.style.cursor = "pointer";
        targetButton.style.marginRight = "10px";
        targetButton.style.padding = "0px";
        targetButton.title = "Your Location";
        control.appendChild(targetButton);
        let text = document.createElement("div");
        text.style.margin = "5px";
        text.style.width = "18px";
        text.style.height = "18px";
        text.style.backgroundImage = "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)";
        text.style.backgroundSize = "180px 18px";
        text.style.backgroundPosition = "0px 0px";
        text.style.backgroundRepeat = "no-repeat";
        targetButton.appendChild(text);
        control.appendChild(targetButton);
        google.maps.event.addDomListener(targetButton, "click", async () => {
            try {
                let location = await this.geolocationService.getUserLocation();
                this.updateUserLocationOn(map, location);
                map.panTo(location);
            } catch (e) {
                console.warn(e);
            }
        });
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(targetButton);
    }

    updateUserLocationOn(map: google.maps.Map, coordinates: any) {
        if (this.userLocationMarker)
            this.userLocationMarker.setMap(null);
        this.userLocationMarker = this.markerService.getUserMarker(map, coordinates);
    }

    generateMarkers(map: google.maps.Map, places: any, options: any, callback?: Function) {
        if (places === null || !places)
            return;
        places.forEach((place) => {
            if (place) {
                place.id = place._id ? place._id : place.place_id;
                place.ionIcon = place.ionIcon || this.globals.mapMarkerIcon;
                place.provider = place._id ? MarsMapMarkerService.MARS_PROVIDER : MarsMapMarkerService.GOOGLE_MAPS_PROVIDER;
                this.currentMarkerLocation = this.getPlaceLocation(place, place.provider);
                this.currentMarkerCoordinates = new google.maps.LatLng(this.currentMarkerLocation.latitude, this.currentMarkerLocation.longitude);
                this.currentMarker = map.get(MarsMapsService.ALREADY_RENDERED_MARKERS)[place.id];
                this.currentMarker = this.currentMarker || this.markerService.getMarker(map, this.currentMarkerCoordinates, place, options);
                // this.markerService.fadeInMarker(this.currentMarker, MarsMapMarkerService.MARKER_OPACITY_INITIAL_VALUE);
                if (!map.get(MarsMapsService.ALREADY_RENDERED_MARKERS)[place.id])
                    map.get(MarsMapsService.ALREADY_RENDERED_MARKERS)[place.id] = this.currentMarker;
            }
        });
        if (callback)
            callback();
    }

    getPlaceLocation(place, provider) {
        try {
            if (provider == MarsMapMarkerService.MARS_PROVIDER)
                return { latitude: place.address.location.lat, longitude: place.address.location.lng, }
            else
                return { latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng(), }
        } catch (e) {
            return { latitude: NaN, longitude: NaN };
        }
    }

    clearMarkers(map) {
        let currentsMarkers = map.get(MarsMapsService.ALREADY_RENDERED_MARKERS);
        let marker: any = {};
        let markerIsOnTheViewport = false;
        for (let markerId in currentsMarkers) {
            marker = currentsMarkers[markerId];
            markerIsOnTheViewport = map.getBounds().contains(marker.getPosition());
            if (marker && marker.setMap) {
                if (!markerIsOnTheViewport) {
                    delete currentsMarkers[markerId];
                    marker.setMap(null);
                }
            }
        };
        map.set(MarsMapsService.ALREADY_RENDERED_MARKERS, currentsMarkers);
    }
}
