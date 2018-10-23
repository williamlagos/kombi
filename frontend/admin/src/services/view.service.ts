/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description View management service.
 */

import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class MarsViewService {
    static RESIZE_EVENT = "resize";

    constructor() { };

    static loadLib(url, callback?, errorCallback?) {
        let isFirstLoad = false;
        let load = () => {
            isFirstLoad = true;
            
            let currentScriptTag = document.querySelector(`script[src="${url}"]`);

            let currentScriptTagIsAlreadyAppended = currentScriptTag && currentScriptTag.remove;
            if (currentScriptTagIsAlreadyAppended)
                currentScriptTag.remove();

            let script: any = document.createElement("script")
            script.type = "text/javascript";
            if (script.readyState) { 
                script.onreadystatechange = () => {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        if (callback)
                            callback();
                    }
                }
            } else { 
                script.onload = () => {
                    if (callback)
                        callback();
                }
                script.onerror = () => {
                    if (errorCallback)
                        errorCallback();
                }
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
        return navigator.onLine ? load() : window.addEventListener("online", (e) => { if (isFirstLoad) load(); });
    }

    static screenIsDesktopSized() {
        return window.innerWidth > 768;
    }
}
