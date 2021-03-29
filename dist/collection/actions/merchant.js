import { Backend } from '../providers/backend';
import { TypeKeys } from '../actions/index';
const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'http://localhost:3000' : 'https://wasserboxer.herokuapp.com';
export const showOrder = (token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const userId = JSON.parse(window.atob(base64))._id;
    const initialOrders = await (await Backend.getReadyOrders({ 'xAccessToken': token })).json();
    const pictures = initialOrders.map((order) => order.pictures).flat();
    const picturesObj = await (await Backend.getPictures({ 'xAccessToken': token, 'ids': pictures.flat() })).json();
    const ordersWithPictures = initialOrders.map(async (order) => {
        if (order.bids.length > 0) {
            const bids = await (await Backend.getOrderBids({ 'xAccessToken': token, 'order': order._id })).json();
            const result = bids.filter((bid) => userId === bid.user._id);
            order.placed = result.length > 0;
        }
        for (let i = 0; i < picturesObj.length; i++) {
            const foundOne = order.pictures.indexOf(picturesObj[i]._id);
            if (foundOne !== -1)
                order.pictures[foundOne] = picturesObj[i];
        }
        return order;
    });
    const orders = await Promise.all(ordersWithPictures);
    return dispatch({
        type: TypeKeys.SHOW_ORDER,
        orders
    });
};
export const showMyOrders = (token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    const orders = await (await Backend.getOrders({ 'xAccessToken': token })).json();
    return dispatch({
        type: TypeKeys.MERCHANT_ORDERS,
        orders
    });
};
export const selectOrder = (order, token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    await Backend.acceptOrder({ 'xAccessToken': token, 'id': order });
    return dispatch({ type: TypeKeys.SELECT_ORDER });
};
export const placeOrder = (bid, order, token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    await (await Backend.placeBid({ 'xAccessToken': token, bid, order }));
    return dispatch({
        type: TypeKeys.PLACE_ORDER,
        orderId: order
    });
};
export const rateOrder = (order, rating, token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    await Backend.rateOrder({ 'xAccessToken': token, 'id': order, 'rate': rating });
    return dispatch({ type: TypeKeys.RATE_ORDER });
};
export const startOrder = (order, token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    await Backend.startOrder({ 'xAccessToken': token, 'id': order });
    return dispatch({ type: TypeKeys.START_ORDER });
};
export const finishOrder = (order, token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    await Backend.finishOrder({ 'xAccessToken': token, 'id': order });
    return dispatch({ type: TypeKeys.FINISH_ORDER });
};
export const cancelOrder = (order, token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    await Backend.cancelOrder({ 'xAccessToken': token, 'id': order });
    return dispatch({ type: TypeKeys.CANCEL_ORDER });
};
