/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description File upload management service.
 */

import { Injectable } from "@angular/core";

import { Uploader } from "angular2-http-file-upload";
import { UploadItem } from "angular2-http-file-upload";

@Injectable()
export class MarsFileUploaderService {

    constructor(private uploaderService: Uploader) { }

    upload(url: string, file: File, params: any, headers: any, callback: Function) {
        let uploadItem = new UploadItem();
        uploadItem.file = file;
        uploadItem.url = url;
        uploadItem.headers = headers;
        uploadItem.formData = params; 

        this.uploaderService.upload(uploadItem);

        this.uploaderService.onCompleteUpload = (item, response, status, headers) => {
            if (callback) callback(undefined, response);
        };
        this.uploaderService.onErrorUpload = (item, response, status, headers) => {
            if (callback) callback({ status: status, message: "Whoops! There was an error uploading the file :(" });
        };
    }
}
