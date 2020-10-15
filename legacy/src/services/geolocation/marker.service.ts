/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Map marker management service.
 */

import { Injectable } from "@angular/core";

import { Platform } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";

const MARKER_OPACITY_INCREMENT = 0.1;

declare var RichMarker;

@Injectable()
export class MarsMapMarkerService {

    static MARKER_OPACITY_INITIAL_VALUE = 0.1;
    static GOOGLE_MAPS_PROVIDER = "google";
    static MARS_PROVIDER = "mars";

    constructor(public platform: Platform, public globals: AppGlobals) { }

    getMarker(map: google.maps.Map, position: google.maps.LatLng, place, options: any = {}) {
        let isMD = document.querySelector("ion-app").className.indexOf("md") > -1;
        let platform = isMD ? "md" : "ios";
        options = Object.assign({
            position: position,
            map: map,
            visible: true,
            optimized: true,
            shadow: 'none',
            content: `<section class='marker ${place.cssClasses}'>
                <section icon>
                    <ion-icon class="icon icon-${platform} ion-${platform}-${place.ionIcon || this.globals.mapMarkerIcon}"></ion-icon> 
                </section>
            </section>`
        }, options);
        let marker = new RichMarker(options);
        if (options.onMarkerClick) {
            marker.addListener("click", () => {
                options.onMarkerClick(marker, place);
            });
            if (marker.markerWrapper_)
                marker.markerWrapper_.style.cursor = "pointer";
        };
        return marker;
    };

    getUserMarker(map: google.maps.Map, coordinates: google.maps.LatLng) {
        return new google.maps.Marker({
            map: map,
            icon: "assets/images/map/user-marker.png",
            position: coordinates,
            visible: true,
            title: "Sua localização"
        });
    };

    fadeInMarker(marker: google.maps.Marker, markerOpacity: number) {
        if (markerOpacity <= 1) {
            marker.setOpacity(markerOpacity);
            setTimeout(() => {
                markerOpacity += MARKER_OPACITY_INCREMENT;
                this.fadeInMarker(marker, markerOpacity);
            }, 50);
        }
    }

}
