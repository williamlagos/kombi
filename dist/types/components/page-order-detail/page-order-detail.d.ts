import '../../stencil.core';
import { Config } from '@ionic/core';
import { Action, Store } from '@stencil/redux';
export declare class PageOrderDetail {
    el: any;
    order: any;
    orderId: string;
    userId: any;
    role: string;
    config: Config;
    store: Store;
    data: {
        'value': number;
        'description': string;
    };
    token: string;
    bids: any;
    tab: HTMLIonTabsElement;
    close: Action;
    placeOrder: Action;
    acceptOrder: Action;
    showOrderBids: Action;
    selectMerchantForOrder: Action;
    componentWillLoad(): Promise<void>;
    dismiss(data?: any): Promise<void>;
    offer(): void;
    schedule(): void;
    handleInput(ev: any): void;
    render(): JSX.Element[];
}
