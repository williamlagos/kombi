/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Map geocoder management service.
 */

import { Injectable } from "@angular/core";
import { MarsGeolocationService } from "./geolocation.service";

@Injectable()
export class MarsGeocoderService {

    geocoder: google.maps.Geocoder;

    constructor() {
        MarsGeolocationService.onLoad(() => {
            this.geocoder = new google.maps.Geocoder();
        });
    };

    coordinatesToAddress(coordinates) {
        return new Promise((resolve, reject) => {
            MarsGeolocationService.onLoad(() => {
                this.geocoder.geocode(<google.maps.GeocoderRequest>{
                    "latLng": coordinates
                }, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK)
                        if (results[0]) return resolve(results[0]);
                        else return reject(MarsGeocoderService.name + ": Whoops! No results found for geocoder.");
                    else return reject(MarsGeocoderService.name + ": Geocoder failed due to: " + status);
                });
            });
        });

    }

    addressSearch(address) {
        return new Promise((resolve, reject) => {
            MarsGeolocationService.onLoad(() => {
                this.geocoder.geocode(<google.maps.GeocoderRequest>{
                    "address": address
                }, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            resolve(results[0]);
                        } else {
                            reject(MarsGeocoderService.name + ": Whoops! No results found for geocoder.");
                        }
                    } else {
                        reject(MarsGeocoderService.name + ": Geocoder failed due to: " + status);
                    }
                });
            })

        });
    }

    async addressToCoordinates(address) {
        return new Promise((resolve, reject) => {
            MarsGeolocationService.onLoad(async () => {
                try {

                } catch (e) {
                    return reject(e);
                }
                let result = await this.addressSearch(address) as any;
                let coordinates = {
                    lng: result.geometry.location.lng(),
                    lat: result.geometry.location.lat()
                }
                resolve(coordinates);
            });
        });
    }

}


