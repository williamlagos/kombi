import '../../stencil.core';
import { Action, Store } from '@stencil/redux';
export declare class PageTabs {
    menuCtrl: HTMLIonMenuControllerElement;
    tabCtrl: HTMLIonTabsElement;
    store: Store;
    role: any;
    hasTabs: boolean;
    directions: any[];
    open: Action;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    select(tab: string): Promise<void>;
    toggleOpen(tab: string): void;
    render(): JSX.Element[];
}
