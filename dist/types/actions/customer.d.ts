import { TypeKeys } from '../actions/index';
export interface RegisterOrderAction {
    type: TypeKeys.REGISTER_ORDER;
}
export interface ShowMyOrdersAction {
    type: TypeKeys.MY_ORDERS;
    orders: any;
}
export interface ShowOrderBidsAction {
    type: TypeKeys.ORDER_BIDS;
    bids: any;
}
export interface SetMerchantOrderAction {
    type: TypeKeys.ORDER_MERCHANT;
}
export declare const registerOrder: (data: any, token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const showMyOrders: (token: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const showOrderBids: (token: string, orderId: string) => (dispatch: any, _getState: any) => Promise<any>;
export declare const selectMerchantForOrder: (merchantId: string, orderId: string, token: string) => (dispatch: any, _getState: any) => Promise<any>;
