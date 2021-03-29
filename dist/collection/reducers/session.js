import { Storage } from '../providers/storage';
import { TypeKeys } from '../actions/index';
const prepareState = () => {
    const defaultState = {
        token: '',
        explained: 0,
        introduced: 0,
        registered: true,
        directions: [{
                component: 'LOGIN',
                url: '/login'
            }],
    };
    const sessionOpen = Storage.getItem('token');
    return Object.assign({}, defaultState, { token: sessionOpen || defaultState.token, explained: +Storage.getItem('explained') || +defaultState.explained, introduced: +Storage.getItem('introduced') || +defaultState.introduced, directions: sessionOpen && [...defaultState.directions, { component: 'DRAWER', url: '/' }] || defaultState.directions });
};
const session = (state = prepareState(), action) => {
    switch (action.type) {
        case TypeKeys.SKIP_INTRO: {
            return Object.assign({}, state, { introduced: action.introduced });
        }
        case TypeKeys.SKIP_TOUR: {
            return Object.assign({}, state, { explained: action.explained });
        }
        case TypeKeys.SET_TOKEN: {
            return Object.assign({}, state, { token: action.token, directions: [...state.directions, action.directions] });
        }
        case TypeKeys.REVOKE_TOKEN: {
            return Object.assign({}, state, { token: action.token, directions: [action.directions] });
        }
        case TypeKeys.OPEN_REGISTER: {
            return Object.assign({}, state, { registered: action.registered, directions: [...state.directions, action.directions] });
        }
        case TypeKeys.CLOSE_REGISTER: {
            return Object.assign({}, state, { registered: action.registered, directions: [action.directions] });
        }
        case TypeKeys.OPEN: {
            return Object.assign({}, state, { directions: action.directions ?
                    [...state.directions, action.directions] :
                    [...state.directions] });
        }
        case TypeKeys.CLOSE: {
            return Object.assign({}, state, { directions: state.directions.slice(0, -1) });
        }
        case TypeKeys.OPEN_PROFILE: {
            return Object.assign({}, state, { profile: action.profile });
        }
    }
    return state;
};
export default session;
