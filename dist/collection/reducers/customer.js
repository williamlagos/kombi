import { TypeKeys } from '../actions/index';
const prepareState = () => {
    const defaultState = {
        orders: [],
        bids: []
    };
    return Object.assign({}, defaultState);
};
const customer = (state = prepareState(), action) => {
    switch (action.type) {
        case TypeKeys.REGISTER_ORDER: {
            return Object.assign({}, state);
        }
        case TypeKeys.MY_ORDERS: {
            return Object.assign({}, state, { orders: action.orders });
        }
        case TypeKeys.ORDER_BIDS: {
            return Object.assign({}, state, { bids: action.bids });
        }
        case TypeKeys.ORDER_MERCHANT: {
            return Object.assign({}, state);
        }
    }
    return state;
};
export default customer;
