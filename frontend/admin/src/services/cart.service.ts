/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Cart management service.
 */

import { Injectable } from "@angular/core";
import { AppGlobals } from "@app/app.globals";
import { AppConstants } from "@app/app.constants";
import { Backend } from "@backend/index";
import { EventEmitter } from "@angular/core";
import { MarsInteractionService } from "./interaction.service";
import { AppLocales } from "@app/app.locales";

@Injectable()
export class MarsCartService {

    isUpdating: boolean;
    loaded: EventEmitter<any> = new EventEmitter<any>();
    updated: EventEmitter<any> = new EventEmitter<any>();
    translations: AppTranslations;

    constructor(private globals: AppGlobals,
        private interactionService: MarsInteractionService,
        private locales: AppLocales) {
        this.translations = locales.load();
    };

    async load() {
        return new Promise(async (resolve, reject) => {
            try {
                let cart = this.isDefined() ? await this.read() : await this.create();
                this.set(cart);
                resolve(cart);
            } catch (e) {
                reject(e);
            } finally {
            }
        });
    };

    async create() {
        return new Promise(async (resolve, reject) => {
            try {
                let cart = (await Backend.createCart()).data;
                resolve(cart);
            } catch (e) {
                reject(e);
            } finally {
            }
        });
    }


    async read() {
        return new Promise(async (resolve, reject) => {
            try {
                let cart = (await Backend.getCart({ id: this.get()._id })).data;
                resolve(cart);
            } catch (e) {
                reject(e);
            } finally {

            }
        });
    }

    async getCategoryItems(categorySlug: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let items = (await Backend.getCartItems({ id: this.get()._id, category: categorySlug })).data.items;
                resolve(items);
            } catch (e) {
                reject(e);
            } finally {
            }
        });

    }

    isDefined() {
        return typeof localStorage[AppConstants.CURRENT_CART_ID] !== "undefined";
    };

    set(cart: any) {
        localStorage[AppConstants.CURRENT_CART_ID] = JSON.stringify(cart);
    };

    get(): any {
        let cart = localStorage[AppConstants.CURRENT_CART_ID];
        return this.isDefined() ? JSON.parse(cart) : undefined;
    };

    async clear() {
        return new Promise(async (resolve, reject) => {
            try {
                let cart = (await Backend.clearCart({ id: this.get()._id })).data;
                this.update(cart);
                resolve();
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
                reject();
            } finally {
            }
        });

    };

    async increment(product) {
        return new Promise(async (resolve, reject) => {
            try {
                this.isUpdating = true;
                product.loading = true;
                let cart = (await Backend.incrementOnCart({ id: this.get()._id, item: product })).data;
                this.update(cart);
                resolve();
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
                reject();
            } finally {
                product.loading = false;
                this.isUpdating = false;
            }
        });
    };

    async decrement(product) {
        return new Promise(async (resolve, reject) => {

            try {
                this.isUpdating = true;
                product.loading = true;
                let cart = (await Backend.decrementOnCart({ id: this.get()._id, item: product })).data;
                this.update(cart);
                resolve();
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
                reject();
            } finally {
                product.loading = false;
                this.isUpdating = false;

            }
        });
    };

    update(cart) {
        try {
            this.set(cart);
            this.updated.emit({ cart: cart });
            console.log(cart);
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {

        }
    };

    isEmpty() {
        let cart = this.get() || { items: [] };
        return !(cart.items.length > 0);
    };
}
