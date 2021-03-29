import { TypeKeys } from '../actions/index';
const prepareState = () => {
    const defaultState = {
        orders: []
    };
    return Object.assign({}, defaultState);
};
const merchant = (state = prepareState(), action) => {
    switch (action.type) {
        case TypeKeys.SELECT_ORDER: {
            return Object.assign({}, state);
        }
        case TypeKeys.CANCEL_ORDER: {
            return Object.assign({}, state);
        }
        case TypeKeys.START_ORDER: {
            return Object.assign({}, state);
        }
        case TypeKeys.SHOW_ORDER: {
            return Object.assign({}, state, { orders: action.orders });
        }
        case TypeKeys.PLACE_ORDER: {
            return Object.assign({}, state, { orderId: action.orderId });
        }
        case TypeKeys.MERCHANT_ORDERS: {
            return Object.assign({}, state, { orders: action.orders });
        }
    }
    return state;
};
export default merchant;
