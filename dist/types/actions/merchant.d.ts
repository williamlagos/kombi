import { TypeKeys } from '../actions/index';
export interface SelectOrderAction {
    type: TypeKeys.SELECT_ORDER;
}
export interface ShowOrderAction {
    type: TypeKeys.SHOW_ORDER;
    orders: any[];
}
export interface PlaceOrderAction {
    type: TypeKeys.PLACE_ORDER;
    orderId: string;
}
export interface ShowMerchantOrdersAction {
    type: TypeKeys.MERCHANT_ORDERS;
    orders: any[];
}
export interface StartOrderAction {
    type: TypeKeys.START_ORDER;
}
export interface CancelOrderAction {
    type: TypeKeys.CANCEL_ORDER;
}
export interface FinishOrderAction {
    type: TypeKeys.FINISH_ORDER;
}
export interface RateOrderAction {
    type: TypeKeys.RATE_ORDER;
}
export declare const showOrder: (token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const showMyOrders: (token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const selectOrder: (order: any, token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const placeOrder: (bid: any, order: any, token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const rateOrder: (order: any, rating: any, token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const startOrder: (order: any, token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const finishOrder: (order: any, token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const cancelOrder: (order: any, token: string) => (dispatch: any, _getState: any) => Promise<any>;
