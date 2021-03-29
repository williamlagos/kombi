import { get, remove, set } from './storage';
const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
export class UserDataController {
    constructor() {
        this.favorites = new Set();
    }
    hasFavorite(sessionName) {
        return this.favorites.has(sessionName);
    }
    addFavorite(sessionName) {
        this.favorites.add(sessionName);
    }
    removeFavorite(sessionName) {
        this.favorites.delete(sessionName);
    }
    async login(username) {
        await set(HAS_LOGGED_IN, true);
        await this.setUsername(username);
        window.dispatchEvent(new Event('user:login'));
    }
    async signup(username) {
        await set(HAS_LOGGED_IN, true);
        await this.setUsername(username);
        window.dispatchEvent(new Event('user:signup'));
    }
    async logout() {
        await remove(HAS_LOGGED_IN);
        await remove('username');
        window.dispatchEvent(new Event('user:logout'));
    }
    async setUsername(username) {
        await set('username', username);
    }
    async getUsername() {
        return get('username');
    }
    async isLoggedIn() {
        const value = await get(HAS_LOGGED_IN);
        return value === true;
    }
    async hasSeenTutorial(value) {
        return set(HAS_SEEN_TUTORIAL, value);
    }
    async checkHasSeenTutorial() {
        const value = await get(HAS_SEEN_TUTORIAL);
        return !!value;
    }
}
export const UserData = new UserDataController();
