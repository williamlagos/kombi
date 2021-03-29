import '../../stencil.core';
export declare class Wizard {
    step: number;
    submitted: boolean;
    needSignup: boolean;
    id: string;
    steps: number;
    action: any;
    images: any;
    next(e: any): void;
    back(e: any): void;
    submit(e: any): void;
    render(): JSX.Element;
}
