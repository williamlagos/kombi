/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Picture service.
 */

import { Injectable } from "@angular/core";
import { AppConstants } from "@app/app.constants";
import { MarsAuthService } from "@services/auth.service";
import { MarsFileUploaderService } from "@services/file-uploader.service";

declare var ImageTools;
declare var loadImage;

@Injectable()
export class MarsPictureService {

    API_PATH: string;
    STANDARD_ORIENTATION = 1;

    constructor(public fileUploaderService: MarsFileUploaderService) {
        this.setApiPath("picture");
    }

    setApiPath(apiPath: string) {
        this.API_PATH = AppConstants.SERVER_ADDRESS.concat("/api/", apiPath);
    }

    async save(picture: File, params: any = {}, callback?: Function) {
        let PICTURE_SAVE_URL = this.API_PATH + "/save";
        let userToken = MarsAuthService.getLoggedInUser().token;
        this.fileUploaderService.upload(PICTURE_SAVE_URL, picture, params, { "x-access-token": userToken }, callback);
    }

    scale(picture: File, scaleFactor: number) {
        var imagePath = URL.createObjectURL(picture);
        var image = new Image();
        return new Promise((resolve, reject) => {
            image.onload = () => {
                ImageTools.resize(picture, {
                    width: (image.width * scaleFactor), // maximum width 
                    height: (image.height * scaleFactor) // maximum height 
                }, function (resized, resizeWasSuccessfull) {
                    if (!resizeWasSuccessfull)
                        console.warn(MarsPictureService.name + ": ImageTools was unable to scale the image :(");
                    resizeWasSuccessfull ? resolve(resized) : resolve(picture);
                });
            };
            image.src = imagePath;
        });
    }

    getOrientation(file: File) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = function (e) {

                var view = new DataView((e.target as any).result);
                if (view.getUint16(0, false) != 0xFFD8) {
                    return resolve(-2);
                }
                var length = view.byteLength, offset = 2;
                while (offset < length) {
                    if (view.getUint16(offset + 2, false) <= 8) return resolve(-1);
                    var marker = view.getUint16(offset, false);
                    offset += 2;
                    if (marker == 0xFFE1) {
                        if (view.getUint32(offset += 2, false) != 0x45786966) {
                            return resolve(-1);
                        }
                        var little = view.getUint16(offset += 6, false) == 0x4949;
                        offset += view.getUint32(offset + 4, little);
                        var tags = view.getUint16(offset, little);
                        offset += 2;
                        for (var i = 0; i < tags; i++) {
                            if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                                return resolve(view.getUint16(offset + (i * 12) + 8, little));
                            }
                        }
                    }
                    else if ((marker & 0xFF00) != 0xFF00) {
                        break;
                    }
                    else {
                        offset += view.getUint16(offset, false);
                    }
                }
                return resolve(-1);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    async properlyRotate(file: File) {
        return new Promise(async (resolve, reject) => {
            let rotation = await this.getOrientation(file);
            let mustRotate = rotation > this.STANDARD_ORIENTATION;
            if (mustRotate) { // In case the image must be rotated
                let options = { orientation: rotation };
                loadImage(file, (img) => {
                    img.toBlob((blob) => resolve(blob));
                }, options);
            } else { // Otherwise, we're good to go!
                resolve(file);
            }
        });
    }

    getPicture(pictureId: any) {
        return this.API_PATH + "/" + pictureId;
    }

    getPictureUrlFor(item: any) {
        return this.API_PATH + "/" + item._id;
    }

    getProfilePictureFor(user: any) {
        let oauthProvider = user.oauthProvider;
        switch (oauthProvider) {
            case "facebook": {
                return AppConstants.FACEBOOK_PICTURE_URL.replace("userId", user.oauthId);
            };
            case "linkedin": {
                return (user.pictureUrls && user.pictureUrls.values) ? user.pictureUrls.values[0] : user.pictureUrl;
            }
            case "twitter": {
                return user.profile_image_url ? user.profile_image_url.replace("normal", "400x400") : user.pictureUrl;
            }
            default: {
                return "assets/images/spinner.gif";
            }
        }
    }
}