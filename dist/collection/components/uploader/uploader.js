const MAX_UPLOAD_SIZE = 1024;
const ALLOWED_FILE_TYPES = 'image.*';
export class Uploader {
    constructor() {
        this.index = 0;
        this.list = [];
    }
    reset() {
        let imagePreviewContainer;
        imagePreviewContainer = this.elementHost.shadowRoot.querySelector('#preview0');
        imagePreviewContainer.style.background = `white`;
        this.list = [];
    }
    onInputChange(files) {
        if (files.length >= 1) {
            for (let i = 0; i < files.length; i++) {
                const imageFile = files[i];
                if (!this.checkFileSize(imageFile.size)) {
                    console.error('Maximum file size exceeded. Max file size is: ' + MAX_UPLOAD_SIZE);
                    return false;
                }
                else if (!this.checkFileType(imageFile.type)) {
                    console.error('File type is not allowed');
                    return false;
                }
                this.uploadImage(imageFile);
            }
            this.list = [];
            this.index = 0;
            this.previews = files;
            for (let i = 0; i < files.length; i++)
                this.list.push(i);
            this.send(files);
        }
        else {
            console.error(files.length === 0 ? 'NO IMAGE UPLOADED' : 'YOU CAN ONLY UPLOAD ONE IMAGE AT THE TIME');
            return false;
        }
    }
    uploadImage(file) {
        const reader = new FileReader();
        reader.onloadstart = () => {
        };
        reader.onload = () => {
            let imagePreviewContainer;
            imagePreviewContainer = this.elementHost.shadowRoot.querySelector('#preview' + this.index);
            imagePreviewContainer.style.backgroundImage = `url(${reader.result})`;
            this.index++;
            this.onUploadCompleted.emit(file);
        };
        reader.onloadend = () => {
        };
        reader.onerror = (err) => {
            console.error('something went wrong...', err);
        };
        reader.readAsDataURL(file);
    }
    checkFileSize(size) {
        return (size / MAX_UPLOAD_SIZE / MAX_UPLOAD_SIZE) <= MAX_UPLOAD_SIZE;
    }
    checkFileType(type) {
        return type.match(ALLOWED_FILE_TYPES).length > 0;
    }
    render() {
        return h("div", { class: "image-upload" },
            h("div", { class: "image-upload__edit" },
                h("label", { htmlFor: "file" }),
                h("input", { type: "file", name: "files[]", value: "", id: "file", accept: "image/*", class: "image-upload__input", onChange: ($event) => this.onInputChange($event.target.files), multiple: true })),
            this.list.length > 0 ?
                this.list.map((preview) => {
                    return (h("div", { class: "image-upload__multiple-preview" },
                        h("div", { id: 'preview' + preview })));
                }) :
                h("div", { class: "image-upload__multiple-preview" },
                    h("div", { id: 'preview0' })));
    }
    static get is() { return "image-uploader"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "elementHost": {
            "elementRef": true
        },
        "index": {
            "state": true
        },
        "list": {
            "state": true
        },
        "previews": {
            "state": true
        },
        "reset": {
            "method": true
        },
        "send": {
            "type": "Any",
            "attr": "send"
        }
    }; }
    static get events() { return [{
            "name": "onUploadCompleted",
            "method": "onUploadCompleted",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:image-uploader:**/"; }
}
