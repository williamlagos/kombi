import { ActionTypes } from '../actions/index';
interface AppState {
    orders: any[];
}
declare const merchant: (state: AppState, action: ActionTypes) => AppState | {
    orderId: string;
    orders: any[];
};
export default merchant;
