



interface String {
    contaisNumbers(): boolean;
    contains(keyword: string): boolean;
    toTitleCase(): string;
    isValidEmail(): boolean;
    limitTo(limit: number): string;
    toCurrencyMask(): string;
    toUnderscoreCase(): string;
    toDashCase(): string;
}

interface Date {
    fromNow(): string;
}

interface Number {
    toRad(): number;
}

interface Array<T> {
    indexOfObject(property: string, value: any): number;
    containsObjectWith(property: string, value: any): boolean;
}

interface Element {
    remove(): void;
}

declare class MarkerWithLabelOptions extends MarkerWithLabel {
    constructor();
    crossImage: string;
    handCursor: string;
    labelAnchor: any;
    labelClass: string;
    labelContent: any;
    labelInBackground: boolean;
    labelStyle: any;
    labelVisible: boolean;
    optimized: boolean;
    raiseOnDrag: boolean;
    position: any;
}

declare class MarkerWithLabel extends google.maps.Marker {
    constructor(opts?: any);
    crossImage: string;
    handCursor: string;
    labelAnchor: any;
    labelClass: string;
    labelContent: any;
    labelInBackground: boolean;
    labelStyle: any;
    labelVisible: boolean;
    optimized: boolean;
    raiseOnDrag: boolean;
    marsMerchantId: string;
}