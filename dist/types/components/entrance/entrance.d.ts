import '../../stencil.core';
import { Entrance as EntranceContainer } from '../../containers/entrance';
import { Action, Store } from '@stencil/redux';
export declare class Entrance {
    username: {
        valid: boolean;
        value: string;
    };
    password: {
        valid: boolean;
        value: string;
    };
    name: string;
    introduced: boolean;
    submitted: boolean;
    registered: boolean;
    store: Store;
    setToken: Action;
    register: Action;
    appSetName: Action;
    toggleIntro: Action;
    openRegister: Action;
    closeRegister: Action;
    entrance: EntranceContainer;
    componentWillLoad(): Promise<void>;
    handleUsername(ev: any): void;
    handlePassword(ev: any): void;
    validateUsername(): void;
    validatePassword(): void;
    onLogin(e: any): Promise<void>;
    renderLogin(): JSX.Element[];
    render(): JSX.Element;
}
