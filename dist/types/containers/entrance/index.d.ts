export declare class Entrance {
    private client_id;
    private client_secret;
    private facebook_url;
    constructor();
    startTimer(): void;
    storeFacebookToken(response: any): Promise<{
        name: any;
        email: any;
        address: any;
        role: string;
        password: any;
        birthDate: any;
        files: Blob[];
    }>;
    checkFacebookCode(): Promise<{
        name: any;
        email: any;
        address: any;
        role: string;
        password: any;
        birthDate: any;
        files: Blob[];
    }>;
    openFacebook(): void;
    static parseUrl(): {};
}
