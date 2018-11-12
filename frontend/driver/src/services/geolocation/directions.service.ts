/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Map directions management service.
 */

import { Injectable } from "@angular/core";
import { MarsGeolocationService } from "./geolocation.service";

@Injectable()
export class MarsDirectionsService {

    directionsService: google.maps.DirectionsService;
    directionsDisplay: google.maps.DirectionsRenderer;

    constructor() {
        MarsGeolocationService.onLoad(() => {
            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay.setOptions({ suppressMarkers: true });
        });
    };

    drawNavigationRouteOn(map, originCoordinates, destinyCoordinates) {
        MarsGeolocationService.onLoad(() => {
            this.directionsDisplay.setMap(map);
            let request = <google.maps.DirectionsRequest>{
                origin: originCoordinates,
                destination: destinyCoordinates,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: true,
                drivingOptions: <google.maps.DrivingOptions>{
                    departureTime: new Date(),
                    trafficModel: google.maps.TrafficModel.PESSIMISTIC
                }
            }
            this.directionsService.route(request, (response, status) => {
                if (status == google.maps.DirectionsStatus.OK) {
                    this.directionsDisplay.setDirections(response);
                }
            });
        });
    }
}


