import { ActionTypes } from '../actions/index';
interface AppState {
    orders: any[];
    bids: any[];
}
declare const customer: (state: AppState, action: ActionTypes) => {
    orders: any;
    bids: any[];
} | {
    bids: any;
    orders: any[];
};
export default customer;
