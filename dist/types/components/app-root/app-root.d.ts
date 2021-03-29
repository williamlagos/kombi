import '../../stencil.core';
import 'ionicons';
import '@ionic/core';
import { Action, Store } from '@stencil/redux';
import { App } from '../../containers/app';
export declare class AppRoot {
    token: string;
    explained: number;
    store: Store;
    toggleTour: Action;
    app: App;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): Promise<void>;
    checkLoginStatus(): boolean;
    checkExplainedStatus(): boolean;
    render(): JSX.Element;
}
