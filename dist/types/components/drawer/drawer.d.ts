import '../../stencil.core';
import '@ionic/core';
import { Action, Store } from '@stencil/redux';
export declare class Menu {
    token: string;
    profile: any;
    directions: any;
    store: Store;
    nav: HTMLIonNavElement;
    tabs: HTMLPageTabsElement;
    open: Action;
    openProfile: Action;
    revokeToken: Action;
    appPages: {
        title: string;
        url: string;
        icon: string;
        role: string;
    }[];
    componentWillLoad(): void;
    checkLoginStatus(): boolean;
    parseJwt(token: string): any;
    changeTab(tab: string): Promise<void>;
    showPage(event: any, page: string): Promise<void>;
    displayRating(rating: number): JSX.Element;
    renderMenu(): JSX.Element;
    renderNav(dir: any): JSX.Element;
    render(): JSX.Element;
}
