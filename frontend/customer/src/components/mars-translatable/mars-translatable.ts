/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description I18n label component.
 */

import { Component } from "@angular/core";
import { Input } from "@angular/core";
import { ViewChild } from "@angular/core";
import { ViewContainerRef } from "@angular/core";

import { AppLocales } from "@app/app.locales";

@Component({
    selector: "mars-translatable",
    template: "<span #translation></span>"
})

export class MarsTranslatableComponent {

    translations: AppTranslations;
    translation: string;
    @ViewChild("translation", { read: ViewContainerRef }) translationDiv: ViewContainerRef;
    @Input("content") localeKey: string;

    constructor(public locales: AppLocales) {
        this.translations = locales.load();
    }

    async ngOnInit() {
        this.translation = this.translations[this.localeKey];
        if (!this.translation)
            console.warn(MarsTranslatableComponent.name + `: Whoops! There is no translation for the locale ${this.localeKey} in this language :(`);
        this.translationDiv.element.nativeElement.innerHTML = this.translation;
    }
}
