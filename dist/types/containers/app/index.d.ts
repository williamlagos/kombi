export declare class App {
    _store: any;
    constructor();
    startTimer(): void;
    static parseJwt(token: string): any;
    updateMapDrawer(role: string, customer: any, merchant: any): any[];
    pendingActions(state: any): any[];
}
