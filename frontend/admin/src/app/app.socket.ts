/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Application socket module.
 */

import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable()
export class MarsSocket {

    static socket: any;

    static connect(server) {
        MarsSocket.socket = MarsSocket.socket || io(server);
        MarsSocket.socket.on('disconnect', () => {
            MarsSocket.socket.open();
        });
    }

    static disconnect() {

    }

    static on(event: string, callback?) {
        MarsSocket.socket.on(event, callback);
    }

    static emit(event: string, data: any) {
        MarsSocket.socket.emit(event, data);
    }

    static join(room) {
        MarsSocket.socket.emit('join', room);
    }

    static leave(room) {
        MarsSocket.socket.emit('leave', room);
    }
}