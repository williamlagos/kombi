import { UserDataController } from './user-data';
declare class ConferenceDataController {
    user: UserDataController;
    data: any;
    constructor(user: UserDataController);
    load(): Promise<any>;
    processData(data: any): any;
    getTimeline(dayIndex: number, queryText?: string, excludeTracks?: any[], segment?: string): Promise<any>;
    mapFavorites(sessions: any): void;
    getSession(sessionId: string): Promise<any>;
    filterSession(session: any, queryWords: string[], excludeTracks: any[], segment: string): void;
    getSpeakers(): Promise<any>;
    getSpeaker(speakerId: string): Promise<any>;
    getTracks(): Promise<any>;
    getMap(): Promise<any>;
}
export declare const ConferenceData: ConferenceDataController;
export {};
