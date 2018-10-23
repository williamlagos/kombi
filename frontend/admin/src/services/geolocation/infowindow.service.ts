/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Map infowindow management service.
 */

import { Injectable } from "@angular/core";
import { AppConstants } from "@app/app.constants";

@Injectable()
export class MarsInfoWindowService {

    constructor() { }

    getInfoWindow(map: google.maps.Map, options: any = {}) {
        let div = document.createElement("article");
        options.cssClasses = "infowindow" + options.cssClasses;
        div.classList.add("infowindow", options.cssClasses);
        div.setAttribute("infowindow", "");

        let content = document.createElement("section");
        content.setAttribute("infowindow-content", "");
        content.classList.add("infowindow-content");

        let title = document.createElement("section");
        title.setAttribute("infowindow-title", "");
        title.classList.add("infowindow-title");
        title.innerHTML = options.title;

        let body = document.createElement("section");
        body.setAttribute("infowindow-body", "");
        body.classList.add("infowindow-body");
        body.innerHTML = options.body;

        content.appendChild(title);
        content.appendChild(body);

        if (options && options.moreInfoLink && options.moreInfoLink.onClick) {
            let link = document.createElement("a");
            link.setAttribute("infowindow-link", "");
            link.classList.add("infowindow-link");
            link.innerHTML = options.moreInfoLink.content;
            content.addEventListener("click", () => {
                options.moreInfoLink.onClick(infowindow);
            });
            content.appendChild(link);
        }

        div.appendChild(content);

        let infowindow = new google.maps.InfoWindow({
            content: div
        });


        return infowindow;
    }

}
