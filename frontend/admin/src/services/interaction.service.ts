/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description UI interaction service.
 */

import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { Loading } from "ionic-angular";

@Injectable()
export class MarsInteractionService {

    static LONG_TOAST_DURATION = 2000;
    static SHORT_TOAST_DURATION = 1000;

    constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) { }

    toast(message: string, duration: number = MarsInteractionService.LONG_TOAST_DURATION, callback?: Function) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: "bottom"
        });

        toast.present();
        if (callback) {
            callback();
        }
    }

    customAlert(cssClass: string, message: string, callback?: Function) {
        let alert = this.alertCtrl.create({
            message: message,
            cssClass: cssClass,
            buttons: [{
                text: "OK",
                handler: () => {
                    if (callback)
                        callback();
                }
            }]
        });
        alert.present();
    }

    alert(message: string, callback?: Function) {
        let alert = this.alertCtrl.create({
            message: message,
            buttons: [{
                text: "OK",
                handler: () => {
                    if (callback)
                        callback();
                }
            }]
        });
        alert.present();
    }

    confirm(title: string, buttons: Array<any>, callback?: Function) {
        let alert = this.alertCtrl.create({
            title: title,
            buttons: buttons
        });
        alert.present();
    }

    prompt(title: string, inputs: Array<any>, buttons: Array<any>, callback?: Function) {
        let alert = this.alertCtrl.create({
            title: title,
            inputs: inputs,
            buttons: buttons
        });
        alert.present();
    }

    spinner(options: any): Loading {
        let spinner = this.loadingCtrl.create(options);
        spinner.present();
        return spinner;
    }
}
