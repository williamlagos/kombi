/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Geolocation management service.
 */

import { Injectable } from "@angular/core";

import { AppLocales } from "@app/app.locales";
import { AppConstants } from "@app/app.constants";
import { MarsViewService } from "@services/view.service";
import { EventEmitter } from "@angular/core";
import { AppGlobals } from "@app/app.globals";

declare var window;

@Injectable()
export class MarsGeolocationService {

    static GOOGLE_MAPS_LOADED = "googlemapsloaded";
    static GOOGLE_MAPS_LOAD_TIMED_OUT = "GOOGLE_MAPS_LOAD_TIMED_OUT";
    static libsLoaded: EventEmitter<any> = new EventEmitter();
    static timeout: EventEmitter<any> = new EventEmitter();

    constructor(private globals: AppGlobals) {
        MarsGeolocationService.initLibs();
    };

    
    getUserLocation(options: any = {}, callback?) {
        return new Promise((resolve, reject) => {
            MarsGeolocationService.onLoad(() => {
                window.navigator.geolocation.getCurrentPosition((location) => {
                    let latLng = this.getLatLngFrom(location);
                    this.globals.currentLocation.location = latLng;
                    if (callback)
                        callback(latLng);
                    return resolve(latLng);
                }, (err) => {
                    let location = { coords: { latitude: 0, longitude: 0 } }
                    console.warn(MarsGeolocationService.name + `: There was an error getting the user location (${err})`);
                    return resolve(location);
                });
            });
        });
    }

    getLatLngFrom(location) {
        
        let coordinates = MarsGeolocationService.isReady() ? new google.maps.LatLng(location.coords.latitude, location.coords.longitude) : this.createFallbackCoordinates(location);
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

    
    static initLibs(callback?) {
        MarsViewService.loadLib(AppConstants.GOOGLE_MAPS_LIB_URL, () => {
            MarsViewService.loadLib(AppConstants.GOOGLE_MAPS_MARKER_WITH_LABEL_URL, () => {
                MarsViewService.loadLib(AppConstants.GOOGLE_MAPS_RICHMARKER_URL, () => {

                    MarsGeolocationService.libsLoaded.emit();
                });
            });
        }, () => { MarsGeolocationService.timeout.emit() });
        setTimeout(() => {
            if (!MarsGeolocationService.isReady())
                MarsGeolocationService.timeout.emit();
        }, 15000);
    }

    static onLoad(callback) {
        if (MarsGeolocationService.isReady())
            callback();
        else
            MarsGeolocationService.libsLoaded.subscribe(callback);
    }

    static isReady() {
        return typeof window.google !== "undefined";
    }
}
