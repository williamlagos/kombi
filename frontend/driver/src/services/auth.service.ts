/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Authentication management service.
 */

import { Injectable } from "@angular/core";
import { AppConstants } from "@app/app.constants";

@Injectable()
export class MarsAuthService {

    constructor() { }

    static USER_KEY = AppConstants.CODENAME.toUpperCase().replace(/-/, "_") + "_" + AppConstants.SUBPACKAGE.toUpperCase()  + "_" + "MARS_USER";
    static TOKEN_KEY = AppConstants.CODENAME.toUpperCase().replace(/-/, "_") + "_" + AppConstants.SUBPACKAGE.toUpperCase() + "_" + "MARS_TOKEN";

    static isLoggedIn() {
        return localStorage[MarsAuthService.TOKEN_KEY] != "undefined" && localStorage[MarsAuthService.TOKEN_KEY] != undefined;
    }

    static setLoggedInUser(user) {
        localStorage[MarsAuthService.USER_KEY] = JSON.stringify(user);
    }

    hasRole(role: string) {
        return MarsAuthService.hasRole(role);
    }

    static hasRole(role: string) {
        return this.isLoggedIn() && (this.getLoggedInUser().roles.indexOf(role.toUpperCase()) > -1);
    }

    static getLoggedInUser() {
        if (this.isLoggedIn())
            return JSON.parse(localStorage[MarsAuthService.USER_KEY]);
    }

    static setMarsToken(token: string) {
        localStorage[MarsAuthService.TOKEN_KEY] = token;
    }

    static getMarsToken() {
        return localStorage[MarsAuthService.TOKEN_KEY];
    }

    static logout(callback: Function) {
        delete localStorage[MarsAuthService.USER_KEY];
        delete localStorage[MarsAuthService.TOKEN_KEY];
        callback();
    }

    logout(callback: Function) {
        MarsAuthService.logout(callback);
    }

    isLoggedIn() {
        return MarsAuthService.isLoggedIn();
    }

    setLoggedInUser(user) {
        MarsAuthService.setLoggedInUser(user);
    }

    setMarsToken(token: string) {
        MarsAuthService.setMarsToken(token);
    }

    getMarsToken() {
        return MarsAuthService.getMarsToken();
    }

    getLoggedInUser() {
        return MarsAuthService.getLoggedInUser();
    }

    static finishedSignup() {
        return this.isLoggedIn() && MarsAuthService.getLoggedInUser().signupStep == "finished";
    }

    finishedSignup() {
        return MarsAuthService.finishedSignup();
    }
}