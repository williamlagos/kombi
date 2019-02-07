/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description I18n label component.
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Input } from "@angular/core";
import { ViewChild } from "@angular/core";
import { ViewContainerRef } from "@angular/core";

import { AppLocales } from "@app/app.locales";

@Component({
    selector: "mars-translatable",
    template: "<span #translation></span>",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MarsTranslatableComponent {

    private translations: AppTranslations;
    private translation: string;
    @ViewChild("translation", { read: ViewContainerRef }) translationDiv: ViewContainerRef;
    @Input("content") localeKey: string;

    constructor(private locales: AppLocales,
        private changeDetector: ChangeDetectorRef) {
        this.translations = locales.load();
    }

    async ngOnInit() {
        this.translation = this.translations[this.localeKey];
        if (!this.translation)
            console.warn(MarsTranslatableComponent.name + `: Whoops! There is no translation for the locale ${this.localeKey} in this language :(`);
        this.translationDiv.element.nativeElement.innerHTML = this.translation;
    }
}
