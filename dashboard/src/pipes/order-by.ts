/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Order by pipe.
 */

/*
 * Example use
 *		Basic Array of single type: *ngFor="let todo of todoService.todos | orderBy : "-""
 *		Multidimensional Array Sort on single column: *ngFor="let todo of todoService.todos | orderBy : ["-status"]"
 *		Multidimensional Array Sort on multiple columns: *ngFor="let todo of todoService.todos | orderBy : ["status", "-title"]"
 */

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "orderBy",
    pure: false
})
export class OrderByPipe implements PipeTransform {

    private value: string[] = [];
    private iterations: number = 1;
    private HEALTHY_MAXIMUM_ITERATIONS_NUMBER = 200;
    private thePipeIsOverloadingTheView = false;
    private overloadWarningHasBeenShown = false;

    static _orderByComparator(a: any, b: any): number {

        if (a === null || typeof a === "undefined") a = 0;
        if (b === null || typeof b === "undefined") b = 0;

        if (a instanceof Date && b instanceof Date) {
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
        }

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {

            
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
        } else {

            
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;

        }

        return 0; 
    }

    transform(input: any, config: string = "+"): any {

        
        if (!input) return input;

        this.iterations++;
        this.thePipeIsOverloadingTheView = this.iterations > this.HEALTHY_MAXIMUM_ITERATIONS_NUMBER;
        if (this.thePipeIsOverloadingTheView && !this.overloadWarningHasBeenShown)
            console.warn(OrderByPipe.name + `: the change detection strategy is making the pipe run too many times in a row. 
            Please, consider changing it to ChangeStrategy.OnPush in order to make change detections only when necessary.`);

        
        this.value = [...input];
        let value = this.value;

        if (!Array.isArray(value)) return value;

        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            let propertyToCheck: string = !Array.isArray(config) ? config : config[0];
            let desc = propertyToCheck.substr(0, 1) == "-";

            
            if (!propertyToCheck || propertyToCheck == "-" || propertyToCheck == "+") {
                return !desc ? value.sort() : value.sort().reverse();
            }
            else {
                let property: string = propertyToCheck.substr(0, 1) == "+" || propertyToCheck.substr(0, 1) == "-"
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return value.sort(function (a: any, b: any) {
                    let aValue = a[property];
                    let bValue = b[property];

                    let propertySplit = property.split(".");

                    if (typeof aValue === "undefined" && typeof bValue === "undefined" && propertySplit.length > 1) {
                        aValue = a;
                        bValue = b;
                        for (let j = 0; j < propertySplit.length; j++) {
                            aValue = aValue[propertySplit[j]];
                            bValue = bValue[propertySplit[j]];
                        }
                    }

                    return !desc
                        ? OrderByPipe._orderByComparator(aValue, bValue)
                        : -OrderByPipe._orderByComparator(aValue, bValue);
                });
            }
        }
        else {
            
            return value.sort(function (a: any, b: any) {
                for (let i: number = 0; i < config.length; i++) {
                    let desc = config[i].substr(0, 1) == "-";
                    let property = config[i].substr(0, 1) == "+" || config[i].substr(0, 1) == "-"
                        ? config[i].substr(1)
                        : config[i];

                    let aValue = a[property];
                    let bValue = b[property];

                    let propertySplit = property.split(".");

                    if (typeof aValue === "undefined" && typeof bValue === "undefined" && propertySplit.length > 1) {
                        aValue = a;
                        bValue = b;
                        for (let j = 0; j < propertySplit.length; j++) {
                            aValue = aValue[propertySplit[j]];
                            bValue = bValue[propertySplit[j]];
                        }
                    }

                    let comparison = !desc
                        ? OrderByPipe._orderByComparator(aValue, bValue)
                        : -OrderByPipe._orderByComparator(aValue, bValue);

                    
                    if (comparison != 0) return comparison;
                }

                return 0; 
            });
        }
    }

    order(input: any, orderBy: string = "+") {
        return this.transform(input, orderBy);
    }
}

export let ORDERBY_PROVIDERS = [
    OrderByPipe
];
