import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class Uploader {
    private elementHost;
    onUploadCompleted: EventEmitter<Blob>;
    previews: FileList;
    index: number;
    list: any[];
    send: any;
    reset(): void;
    onInputChange(files: FileList): boolean;
    private uploadImage;
    private checkFileSize;
    private checkFileType;
    render(): JSX.Element;
}
