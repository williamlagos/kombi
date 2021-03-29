import '../../stencil.core';
import { Store } from '@stencil/redux';
export declare class Carousel {
    el: HTMLElement;
    menuCtrl: HTMLIonMenuControllerElement;
    navCtrl: HTMLIonNavElement;
    store: Store;
    componentDidLoad(): Promise<void>;
    render(): JSX.Element[];
}
