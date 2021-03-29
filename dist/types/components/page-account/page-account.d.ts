import '../../stencil.core';
import { Action, Store } from '@stencil/redux';
export declare class PageAccount {
    nav: HTMLIonRouterElement;
    alertCtrl: HTMLIonAlertControllerElement;
    toastCtrl: HTMLIonToastControllerElement;
    store: Store;
    exit: any;
    images: any;
    token: string;
    profile: any;
    submitted: boolean;
    username: {
        valid: boolean;
        value: string;
    };
    password: {
        valid: boolean;
        value: string;
    };
    data: {};
    updateProfile: Action;
    componentWillLoad(): void;
    handleInput(ev: any): void;
    handleRadio(ev: any): void;
    handleFile(files: FileList): void;
    handleAddress(ev: any): void;
    handleUsername(ev: any): void;
    handlePassword(ev: any): void;
    validateUsername(): void;
    validatePassword(): void;
    unload(e: any): void;
    submit(e: any): Promise<void>;
    render(): JSX.Element[];
}
