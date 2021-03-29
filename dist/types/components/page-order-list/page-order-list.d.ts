import '../../stencil.core';
import { Action, Store } from '@stencil/redux';
export declare class PageOrderList {
    mode: string;
    speakers: any[];
    role: string;
    token: string;
    orders: any[];
    orderNumberStart: number;
    orderNumberEnd: number;
    actionSheetCtrl: HTMLIonActionSheetControllerElement;
    modalCtrl: HTMLIonModalControllerElement;
    store: Store;
    showOrder: Action;
    showMyOrders: Action;
    componentWillLoad(): Promise<void>;
    goToSpeakerTwitter(speaker: any): void;
    openSpeakerShare(speaker: any): Promise<void>;
    openContact(speaker: any): Promise<void>;
    parseJwt(token: string): any;
    offer(e: any, order: any): Promise<void>;
    previousOrders(): void;
    nextOrders(): void;
    render(): JSX.Element[];
}
