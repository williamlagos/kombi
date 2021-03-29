import { UserData } from './user-data';
class ConferenceDataController {
    constructor(user) {
        this.user = user;
    }
    async load() {
        if (this.data) {
            return this.data;
        }
        else {
            const rsp = await fetch('/assets/data/data.json');
            const json = await rsp.json();
            return this.processData(json);
        }
    }
    processData(data) {
        this.data = data;
        this.data.tracks = [];
        this.data.schedule.forEach((day) => {
            day.groups.forEach((group) => {
                group.sessions.forEach((session) => {
                    session.speakers = [];
                    if (session.speakerNames) {
                        session.speakerNames.forEach((speakerName) => {
                            const speaker = this.data.speakers.find((s) => s.name === speakerName);
                            if (speaker) {
                                session.speakers.push(speaker);
                                speaker.sessions = speaker.sessions || [];
                                speaker.sessions.push(session);
                            }
                        });
                    }
                    if (session.tracks) {
                        session.tracks.forEach((track) => {
                            if (this.data.tracks.indexOf(track) < 0) {
                                this.data.tracks.push(track);
                            }
                        });
                    }
                });
            });
        });
        return this.data;
    }
    async getTimeline(dayIndex, queryText = '', excludeTracks = [], segment = 'all') {
        const data = await this.load();
        const day = data.schedule[dayIndex];
        day.shownSessions = 0;
        queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        const queryWords = queryText.split(' ').filter(w => !!w.trim().length);
        day.groups.forEach((group) => {
            group.hide = true;
            group.sessions.forEach((session) => {
                this.filterSession(session, queryWords, excludeTracks, segment);
                if (!session.hide) {
                    group.hide = false;
                    day.shownSessions++;
                }
            });
            this.mapFavorites(group.sessions);
        });
        return day;
    }
    mapFavorites(sessions) {
        sessions.map(session => {
            session.isFavorite = this.user.hasFavorite(session.name);
        });
    }
    async getSession(sessionId) {
        const data = await this.load();
        for (const days of data.schedule) {
            for (const group of days.groups) {
                for (const session of group.sessions) {
                    if (session.id === sessionId) {
                        return session;
                    }
                }
            }
        }
        return null;
    }
    filterSession(session, queryWords, excludeTracks, segment) {
        let matchesQueryText = false;
        if (queryWords.length) {
            queryWords.forEach((queryWord) => {
                if (session.name.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        }
        else {
            matchesQueryText = true;
        }
        let matchesTracks = false;
        session.tracks.forEach((trackName) => {
            if (excludeTracks.indexOf(trackName) === -1) {
                matchesTracks = true;
            }
        });
        let matchesSegment = false;
        if (segment === 'favorites') {
            if (this.user.hasFavorite(session.name)) {
                matchesSegment = true;
            }
        }
        else {
            matchesSegment = true;
        }
        session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
    }
    async getSpeakers() {
        const data = await this.load();
        return data.speakers.sort((a, b) => {
            const aName = a.name.split(' ').pop();
            const bName = b.name.split(' ').pop();
            return aName.localeCompare(bName);
        });
    }
    async getSpeaker(speakerId) {
        const data = await this.load();
        for (const speaker of data.speakers) {
            if (speaker.id === speakerId)
                return speaker;
        }
        return null;
    }
    async getTracks() {
        const data = await this.load();
        return data.tracks.sort();
    }
    async getMap() {
        const data = await this.load();
        return data.map;
    }
}
export const ConferenceData = new ConferenceDataController(UserData);
