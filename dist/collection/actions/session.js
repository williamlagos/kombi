import { Storage } from '../providers/storage';
import { TypeKeys } from '../actions/index';
import { Backend } from '../providers/backend';
const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'http://localhost:3000' : 'https://wasserboxer.herokuapp.com';
export const updateProfile = (data, token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    if (data.hasOwnProperty('files')) {
        const files = data.files;
        const pictures = await (await Backend.addPicture({ 'xAccessToken': token, 'files': files })).json();
        const picture = pictures.map((pic) => pic._id)[0];
        await Backend.updateUser({ 'xAccessToken': token, 'user': Object.assign({}, data, { 'pictures': [picture] }) });
    }
    else {
        await Backend.updateUser({ 'xAccessToken': token, 'user': Object.assign({}, data) });
    }
    return dispatch({ type: TypeKeys.UPDATE_PROFILE });
};
export const openProfile = (token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    const profile = await (await Backend.getUserProfile({ 'xAccessToken': token })).json();
    profile.pictures = profile.hasOwnProperty('pictures') && profile.pictures.length > 0 ?
        [(await (await Backend.getPicture({ 'xAccessToken': token, 'id': profile.pictures[0] })).json())['externalRef']] : [];
    return dispatch({
        type: TypeKeys.OPEN_PROFILE,
        profile
    });
};
export const setToken = (email, password) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    const u = { user: { email, password } };
    const d = await (await Backend.authenticateUser(u)).json();
    Storage.setItem('token', String(d.token));
    return dispatch({
        directions: { component: 'DRAWER', url: '/' },
        type: TypeKeys.SET_TOKEN,
        token: d.token
    });
};
export const revokeToken = () => (dispatch, _getState) => {
    Storage.removeItem('token');
    return dispatch({
        directions: { component: 'LOGIN', url: '/login' },
        type: TypeKeys.REVOKE_TOKEN,
        token: ''
    });
};
export const toggleIntro = (option) => async (dispatch, _getState) => {
    Storage.setItem('introduced', String(+option));
    return dispatch({
        type: TypeKeys.SKIP_INTRO,
        introduced: +option
    });
};
export const toggleTour = (option) => async (dispatch, _getState) => {
    Storage.setItem('explained', String(+option));
    return dispatch({
        directions: { component: 'DRAWER', url: '/' },
        type: TypeKeys.SKIP_TOUR,
        explained: +option
    });
};
export const openRegister = () => async (dispatch, _getState) => {
    return dispatch({
        directions: { component: 'REGISTER', url: '/register' },
        type: TypeKeys.OPEN_REGISTER,
        registered: false
    });
};
export const closeRegister = () => async (dispatch, _getState) => {
    return dispatch({
        directions: { component: 'LOGIN', url: '/login' },
        type: TypeKeys.CLOSE_REGISTER,
        registered: true
    });
};
export const register = (data) => async (dispatch, _getState) => {
    const files = data.files;
    console.log(data.files);
    Backend.setDomain(endpoint);
    const d = await (await Backend.createUser({ 'user': data })).json();
    const pictures = await (await Backend.addPicture({ 'xAccessToken': d.token, 'files': files })).json();
    const picture = pictures.map((pic) => pic._id)[0];
    await Backend.updateUser({ 'xAccessToken': d.token, 'user': { 'pictures': [picture] } });
    return dispatch({
        type: TypeKeys.CLOSE_REGISTER,
        registered: true
    });
};
export const open = (component, url) => async (dispatch, _getState) => {
    const stateComponent = _getState().session.directions.slice(-1)[0].component;
    const directions = stateComponent === component ? null : { component, url };
    return dispatch({
        type: TypeKeys.OPEN,
        directions
    });
};
export const close = () => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.CLOSE,
        directions: {}
    });
};
