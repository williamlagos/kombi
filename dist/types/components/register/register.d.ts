import '../../stencil.core';
export declare class Register {
    submitted: boolean;
    username: {
        valid: boolean;
        value: string;
    };
    password: {
        valid: boolean;
        value: string;
    };
    data: {};
    exit: any;
    action: any;
    images: any;
    handleInput(ev: any): void;
    handleRadio(ev: any): void;
    handleFile(files: FileList): void;
    handleAddress(ev: any): void;
    handleUsername(ev: any): void;
    handlePassword(ev: any): void;
    validateUsername(): void;
    validatePassword(): void;
    unload(e: any): void;
    submit(e: any): void;
    render(): JSX.Element[];
}
