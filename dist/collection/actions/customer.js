import { Backend } from '../providers/backend';
import { TypeKeys } from '../actions/index';
const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'http://localhost:3000' : 'https://wasserboxer.herokuapp.com';
export const registerOrder = (data, token) => async (dispatch, _getState) => {
    const files = data.files;
    Backend.setDomain(endpoint);
    const pictures = await (await Backend.addPicture({ 'xAccessToken': token, 'files': files })).json();
    data.pictures = pictures.map((picture) => picture._id);
    await Backend.createOrder({ 'xAccessToken': token, 'order': data });
    return dispatch({ type: TypeKeys.REGISTER_ORDER });
};
export const showMyOrders = (token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const userId = JSON.parse(window.atob(base64))._id;
    const initialOrders = await (await Backend.getOrders({ 'xAccessToken': token })).json();
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
        type: TypeKeys.MY_ORDERS,
        orders
    });
};
export const showOrderBids = (token, orderId) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    const bids = await (await Backend.getOrderBids({ 'xAccessToken': token, 'order': orderId })).json();
    return dispatch({
        type: TypeKeys.ORDER_BIDS,
        bids
    });
};
export const selectMerchantForOrder = (merchantId, orderId, token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    await Backend.setOrderMerchant({ 'xAccessToken': token, 'id': orderId, 'merchant': merchantId });
    return dispatch({ type: TypeKeys.ORDER_MERCHANT });
};
