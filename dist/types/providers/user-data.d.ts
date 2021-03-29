export declare class UserDataController {
    private favorites;
    hasFavorite(sessionName: string): boolean;
    addFavorite(sessionName: string): void;
    removeFavorite(sessionName: string): void;
    login(username: string): Promise<void>;
    signup(username: string): Promise<void>;
    logout(): Promise<void>;
    setUsername(username: string): Promise<void>;
    getUsername(): Promise<string>;
    isLoggedIn(): Promise<boolean>;
    hasSeenTutorial(value: boolean): Promise<void>;
    checkHasSeenTutorial(): Promise<boolean>;
}
export declare const UserData: UserDataController;
