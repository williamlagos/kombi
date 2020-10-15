/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Responsive navbar component.
 */

import { Tabs, NavController, App } from "@ionic/angular";

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Injectable } from "@angular/core";
import { ViewChild } from "@angular/core";

import { AppGlobals } from "@app/app.globals";
import { AppMainPages } from "@pages/main-pages";

import { MarsAuthService } from "@services/auth.service";
import { MarsViewService } from "@services/view.service";
import { AppConstants } from "@app/app.constants";
import { MarsNavigationService } from "@services/navigation.service";

declare var Mars;

@Component({
    selector: "mars-navbar",
    templateUrl: "mars-navbar.html"
})

@Injectable()
export class MarsNavbarComponent {

    navigationService: MarsNavigationService;

    @ViewChild("tabs") tabs: Tabs;

    isFirstTabSelect: boolean = true;
    LAST_SELECTED_TAB = "LAST_SELECTED_TAB";
    intialized: boolean;
    lastTabIndex: number;
    scrollLeft: boolean;
    footerText: string;
    lastView: any;

    constructor(private app: App,
        private globals: AppGlobals,
        private changeDetector: ChangeDetectorRef,
        private authService: MarsAuthService,
        private pages: AppMainPages) {
        this.navigationService = new MarsNavigationService(this.app);
    }

    ngOnInit() {
        let pages = this.pages.refresh();
        let visible = pages.filter((page) => page.canShow());
        if (!(visible.length > 0)) localStorage.clear();
        this.hideModalOnBack();
        this.restoreLastTab();
        this.preserveTabs();
        this.fixTabSelect();
    }

    hideModalOnBack() {
        this.app.viewWillEnter.subscribe((view) => {
            let closeModal = this.lastView && this.lastView.isOverlay;
            if (closeModal) this.lastView.dismiss();
            this.lastView = view;
        });
    }

    fixTabSelect() {
        this.tabs.ionChange.subscribe(() => {
            if(!this.isFirstTabSelect) return;
            this.isFirstTabSelect = false;
            let selected = this.tabs.getSelected();
            if(!selected || !selected._views || !(selected._views.length > 0)) return;
            let isRoot = selected._views && !(selected._views.length > 1);
            let isWrongRoot = selected.root !== selected._views[0].id;
            if (isRoot && isWrongRoot) selected.setRoot(selected.root);
        });
    }

    preserveTabs() {
        this.tabs.ionChange.subscribe(() => {
            let tab = this.tabs.getSelected();
            let stringified = JSON.stringify({ root: tab.root, params: tab.rootParams });
            localStorage[this.LAST_SELECTED_TAB] = stringified;
        });
    }

    restoreLastTab() {
        let stringified = localStorage[this.LAST_SELECTED_TAB];
        if (typeof stringified !== "string") return false;
        let lastTab = JSON.parse(stringified);
        if(!((this.tabs as any)._views)) return false;
        setTimeout(() => {
            this.globals.rootTabs.map((page, index) => {
                if (page.getRoot() == lastTab.root && page.canShow()) {
                    this.tabs.select(index);
                }
            });
            this.globals.hideNavbar = false;
            this.changeDetector.detectChanges();
        }, 250);
    }

    screenIsDesktopSized() {
        return MarsViewService.screenIsDesktopSized();
    }

    toggleDrawer() {
        this.scrollLeft = !this.scrollLeft;
    }

    getFooterText() {
        return "";
        /* if (this.scrollLeft)
            return this.QUITO_LABS_ICON;
        else
            return Mars.UI.sidemenuFooterText || this.QUITO_LABS_TEXT; */
    }
}
