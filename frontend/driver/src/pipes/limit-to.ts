/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Character limit pipe.
 */

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "limitTo"
})
export class LimitToPipe {
  transform(value: string, arg1, arg2?, arg3?, arg4?): string {

    let limit = arg1 ? parseInt(arg1, 10) : 10;
    let trail = arg2 ? arg2 : "...";
    let activate = typeof arg3 == "boolean" ? arg3 : true;
    let ending = arg4 ? arg4 : "";

    if (activate)
      return value.length > limit ? value.substring(0, limit) + trail : value;
    else
      return value + ending;
  }
}