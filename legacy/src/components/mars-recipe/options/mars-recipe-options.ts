/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description recipe options component.
 */

import { ChangeDetectorRef, Component, Input, Output, EventEmitter, NgZone, ChangeDetectionStrategy } from "@angular/core";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { Backend } from "@backend";
import { MarsAuthService } from "@services/auth.service";
import { AppConstants } from "@app/app.constants";
import { ViewController } from "@ionic/angular";
import { NavParams } from "@ionic/angular";

@Component({ templateUrl: "mars-recipe-options.html" })

export class MarsRecipeOptionsMenu {
    recipe: any;
    options: any;
    events: Array<EventEmitter<any>>;
    spinner: any;
    token: string;
    translations: AppTranslations;

    constructor(public viewCtrl: ViewController,
        public navParams: NavParams,
        public locales: AppLocales,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService) {
        this.translations = locales.load();
        this.recipe = navParams.data.recipe;
        this.options = navParams.data.options;
        this.events = navParams.data.events;
        this.token = MarsAuthService.getMarsToken();
    }

    isDeleted() {
        return this.recipe && this.recipe.information && this.recipe.information.deleted;
    }

    emit(event: string) {
        return this.events[event].emit(this.recipe);
    }

    hasListeners(event: EventEmitter<any>) {
        return this.events && event && event.observers.length > 0;
    }

    close(data?: any) {
        this.viewCtrl.dismiss(data);
    }
}