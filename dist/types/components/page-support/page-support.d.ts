import '../../stencil.core';
export declare class PageSupport {
    supportQuestion: {
        valid: boolean;
        value: any;
    };
    submitted: boolean;
    alertCtrl: HTMLIonAlertControllerElement;
    toastCtrl: HTMLIonToastControllerElement;
    componentDidLoad(): Promise<void>;
    handleSupportQuestion(ev: any): void;
    validateQuestion(): void;
    submit(e: any): Promise<void>;
    ionViewCanLeave(): boolean;
    render(): JSX.Element[];
}
