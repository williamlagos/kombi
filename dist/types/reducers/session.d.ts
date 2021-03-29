import { ActionTypes } from '../actions/index';
interface AppState {
    token: string;
    explained: number;
    introduced: number;
    registered: boolean;
    directions: any[];
}
declare const session: (state: AppState, action: ActionTypes) => AppState | {
    profile: any;
    token: string;
    explained: number;
    introduced: number;
    registered: boolean;
    directions: any[];
};
export default session;
