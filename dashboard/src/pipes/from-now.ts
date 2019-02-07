/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Date into time elapsed pipe.
 */

import { Pipe, PipeTransform } from '@angular/core';
 import * as moment from "moment-mini";

 @Pipe({
  name: 'fromNow',
})

export class FromNowPipe implements PipeTransform {
  /**
   * Takes a date value and returns a pretty string from current time, 
   * for instance: "four hours ago" or "in eleven minutes".
   */
  transform(value: string, ...args) {
    return moment(value).fromNow();
  }
}