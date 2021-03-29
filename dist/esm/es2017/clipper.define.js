
// clipper: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './clipper.core.js';
import { COMPONENTS } from './clipper.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
