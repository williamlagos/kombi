/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Nearby management service.
 */

import { Injectable, EventEmitter } from "@angular/core";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";
import { MarsMapsService } from "@services/geolocation/maps.service";
import { Backend } from "@backend/index";

@Injectable()
export class MarsNearByService {

    static MARS_PROVIDER = "mars";
    static GOOGLE_PROVIDER = "google";
    map: any;
    init: EventEmitter<any> = new EventEmitter();

    constructor(private locales: AppLocales,
        private globals: AppGlobals,
        private interactionService: MarsInteractionService,
        private mapsService: MarsMapsService) {
        this.initMap();
    }

    async initMap() {
        this.map = await this.mapsService.getMapForService("nearby-service");
        this.init.emit();
    }

    getNearbyMerchants(options: any = {}) {
        return new Promise((resolve, reject) => {
            MarsGeolocationService.onLoad(async () => {
                let googleMerchants = (await this.getNearbyMerchantsFromGoogleMaps(options) as any);
                let merchants = (await this.getNearbyMerchantsFromServer(options) as any);
                merchants = googleMerchants.concat(merchants);
                merchants.map((merchant) => {
                    merchant.ionIcon = this.globals.mapMarkerIcon;
                });
                resolve(merchants);
            });
        });
    }

    async getNearbyMerchantsFromServer(options) {
        let desiredRadius = options.keyword ? 100000 : 10000;
        let params = {
            "latitude": typeof options.coordinates.lat == "function" ? options.coordinates.lat() : options.coordinates.lat,
            "longitude": typeof options.coordinates.lng == "function" ? options.coordinates.lng() : options.coordinates.lng,
            "radius": desiredRadius,
            "keyword": options.keyword,
            "types": options.types
        };
        return new Promise(async (resolve, reject) => {
            try {
                let merchants = (await Backend.getNearbyMerchants(params)).data;
                merchants.map((merchant) => {
                    if (merchant.address)
                        merchant.vicinity = merchant.address.vicinity;
                    merchant.provider = MarsNearByService.MARS_PROVIDER;
                });
                resolve(merchants);
            } catch (e) {
                reject(e);
            } finally {
            }
        });
    }

    getNearbyMerchantsFromGoogleMaps(options) {
        let desiredRadius = options.keyword ? 100000 : 3000;
        let params = {
            "latitude": options.coordinates.lat(),
            "longitude": options.coordinates.lng(),
            "radius": desiredRadius,
            "keyword": options.keyword,
            "types": options.types
        };
        return new Promise((resolve, reject) => {
            if (!navigator.onLine) {
                return reject();
            }
            let service = new google.maps.places.PlacesService(this.map);
            let location = new google.maps.LatLng(params.latitude, params.longitude);
            service.nearbySearch({
                location: location,
                radius: params.radius,
                keyword: params.keyword,
                types: params.types,
            }, (merchants) => {
                merchants.map((merchant) => {
                    (merchant as any).provider = MarsNearByService.GOOGLE_PROVIDER;
                });
                resolve(merchants);
            });
        });
    }

    async getMerchantData(merchantProvider: string, merchant: string) {
        let merchantIsFromMars = merchantProvider == MarsNearByService.MARS_PROVIDER;
        let response = await merchantIsFromMars ? (await Backend.getMerchantByUsername({ username: merchant })).data : (await this.getGooglePlaceData(merchant));
        return response;
    }

    async getGooglePlaceData(merchant: string) {
        return new Promise((resolve, reject) => {
            let requestInformation = () => {
                let service = new google.maps.places.PlacesService(this.map);
                service.getDetails({ placeId: merchant }, (place, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        (place as any).address = place;
                        resolve(place);
                    } else {
                        reject(status);
                    }
                });
            }
            if (this.map) {
                requestInformation();
            } else {
                this.init.subscribe(requestInformation);
            }
        });
    }
}
