/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Application util functions.
 */

import { Injectable } from "@angular/core";

@Injectable()
export class AppUtils {

    constructor() { };

     static generateUniqueIdOf(numberOfChars) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < numberOfChars; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text.toUpperCase();
    }
}

Array.prototype.indexOfObject = function (property: string, value: any) {
    try {
        for (let i = 0, len = this.length; i < len; i++) {
            if (this[i] !== null && eval(`this[i].${property}`) === value) return i;
        }
        return -1;
    } catch (e) {
        return -1;
    }
}

Array.prototype.containsObjectWith = function (property: string, value: any) {
    return this.indexOfObject(property, value) > -1;
}

Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}

String.prototype.contaisNumbers = function () {
    let numbersOnString = this.match(/\d+/g);
    let stringHasNumbers = numbersOnString != null;
    return stringHasNumbers;
}

String.prototype.contains = function (keyword: string) {
    let stringContainsKeyword = this.indexOf(keyword) > -1;
    return stringContainsKeyword;
}

String.prototype.isValidEmail = function () {
    let emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return emailRegex.test(this);
}

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        if (txt)
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        else
            return this;
    });
}

String.prototype.toUnderscoreCase = function () {
    return this.replace(/\.?([A-Z]+)/g, function (x, y) { return "_" + y.toLowerCase() }).replace(/^_/, "");
}

String.prototype.toDashCase = function () {
    return this.replace(/\.?([A-Z]+)/g, function (x, y) { return "-" + y.toLowerCase() }).replace(/^-/, "");
}

String.prototype.limitTo = function (limit: number) {
    return this.substring(0, limit) + ((this.length > limit) ? "..." : "");
}

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}