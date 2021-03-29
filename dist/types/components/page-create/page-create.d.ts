import '../../stencil.core';
import { Action, Store } from '@stencil/redux';
export declare class PageCreate {
    store: Store;
    tab: HTMLIonTabsElement;
    descriptions: any[];
    descriptionsLength: number;
    directions: any[];
    token: any;
    data: {
        job: {
            origin: {
                items: any[];
            };
            destination: {};
        };
    };
    open: Action;
    close: Action;
    registerOrder: Action;
    componentWillLoad(): void;
    parseJwt(token: string): any;
    handleSubmit(e: any): Promise<void>;
    handleAddress(e: any, data: any, type: string): void;
    handleFile(f: FileList): void;
    handleInput(ev: any): void;
    handleDescription(e: any): void;
    addDescription(e: any): void;
    dateInterval(): {
        today: string;
        tomorrow: string;
    };
    render(): JSX.Element[];
}
