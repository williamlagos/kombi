import { TypeKeys } from '../actions/index';
export interface OpenProfileAction {
    type: TypeKeys.OPEN_PROFILE;
    profile: any;
}
export interface SetTokenAction {
    type: TypeKeys.SET_TOKEN;
    directions: any[];
    token: string;
}
export interface RevokeTokenAction {
    type: TypeKeys.REVOKE_TOKEN;
    directions: any[];
    token: string;
}
export interface SkipIntroAction {
    type: TypeKeys.SKIP_INTRO;
    directions: any[];
    introduced: number;
}
export interface SkipTourAction {
    type: TypeKeys.SKIP_TOUR;
    directions: any[];
    explained: number;
}
export interface OpenRegisterAction {
    type: TypeKeys.OPEN_REGISTER;
    directions: any[];
    registered: boolean;
}
export interface CloseRegisterAction {
    type: TypeKeys.CLOSE_REGISTER;
    directions: any[];
    registered: boolean;
}
export interface OpenAction {
    type: TypeKeys.OPEN;
    directions: any[];
}
export interface CloseAction {
    type: TypeKeys.CLOSE;
    directions: any[];
}
export interface UpdateProfileAction {
    type: TypeKeys.UPDATE_PROFILE;
}
export declare const updateProfile: (data: any, token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const openProfile: (token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const setToken: (email: string, password: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const revokeToken: () => (dispatch: any, _getState: any) => any;
export declare const toggleIntro: (option: boolean) => (dispatch: any, _getState: any) => Promise<any>;
export declare const toggleTour: (option: boolean) => (dispatch: any, _getState: any) => Promise<any>;
export declare const openRegister: () => (dispatch: any, _getState: any) => Promise<any>;
export declare const closeRegister: () => (dispatch: any, _getState: any) => Promise<any>;
export declare const register: (data: any) => (dispatch: any, _getState: any) => Promise<any>;
export declare const open: (component: string, url: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const close: () => (dispatch: any, _getState: any) => Promise<any>;
