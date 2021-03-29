import { h } from '../clipper.core.js';

import { a as Backend, b as TypeKeys } from './chunk-c46efb37.js';

const Storage = localStorage || window.localStorage;
function set(key, value) {
    return new Promise((resolve, reject) => {
        try {
            Storage && localStorage.setItem(key, JSON.stringify(value));
            resolve();
        }
        catch (err) {
            reject(`Couldnt store object ${err}`);
        }
    });
}
function remove(key) {
    return new Promise((resolve, reject) => {
        try {
            Storage && localStorage.removeItem(key);
            resolve();
        }
        catch (err) {
            reject(`Couldnt remove object ${err}`);
        }
    });
}
function get(key) {
    return new Promise((resolve, reject) => {
        try {
            if (Storage) {
                const item = localStorage.getItem(key);
                resolve(JSON.parse(item));
            }
            resolve(undefined);
        }
        catch (err) {
            reject(`Couldnt get object: ${err}`);
        }
    });
}

const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'http://localhost:3000' : 'https://wasserboxer.herokuapp.com';
const updateProfile = (data, token) => async (dispatch, _getState) => {
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
const openProfile = (token) => async (dispatch, _getState) => {
    Backend.setDomain(endpoint);
    const profile = await (await Backend.getUserProfile({ 'xAccessToken': token })).json();
    profile.pictures = profile.hasOwnProperty('pictures') && profile.pictures.length > 0 ?
        [(await (await Backend.getPicture({ 'xAccessToken': token, 'id': profile.pictures[0] })).json())['externalRef']] : [];
    return dispatch({
        type: TypeKeys.OPEN_PROFILE,
        profile
    });
};
const setToken = (email, password) => async (dispatch, _getState) => {
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
const revokeToken = () => (dispatch, _getState) => {
    Storage.removeItem('token');
    return dispatch({
        directions: { component: 'LOGIN', url: '/login' },
        type: TypeKeys.REVOKE_TOKEN,
        token: ''
    });
};
const toggleIntro = (option) => async (dispatch, _getState) => {
    Storage.setItem('introduced', String(+option));
    return dispatch({
        type: TypeKeys.SKIP_INTRO,
        introduced: +option
    });
};
const toggleTour = (option) => async (dispatch, _getState) => {
    Storage.setItem('explained', String(+option));
    return dispatch({
        directions: { component: 'DRAWER', url: '/' },
        type: TypeKeys.SKIP_TOUR,
        explained: +option
    });
};
const openRegister = () => async (dispatch, _getState) => {
    return dispatch({
        directions: { component: 'REGISTER', url: '/register' },
        type: TypeKeys.OPEN_REGISTER,
        registered: false
    });
};
const closeRegister = () => async (dispatch, _getState) => {
    return dispatch({
        directions: { component: 'LOGIN', url: '/login' },
        type: TypeKeys.CLOSE_REGISTER,
        registered: true
    });
};
const register = (data) => async (dispatch, _getState) => {
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
const open = (component, url) => async (dispatch, _getState) => {
    const stateComponent = _getState().session.directions.slice(-1)[0].component;
    const directions = stateComponent === component ? null : { component, url };
    return dispatch({
        type: TypeKeys.OPEN,
        directions
    });
};
const close = () => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.CLOSE,
        directions: {}
    });
};

export { close as a, revokeToken as b, openProfile as c, open as d, Storage as e, toggleTour as f, setToken as g, toggleIntro as h, openRegister as i, closeRegister as j, register as k, set as l, remove as m, get as n, updateProfile as o };
