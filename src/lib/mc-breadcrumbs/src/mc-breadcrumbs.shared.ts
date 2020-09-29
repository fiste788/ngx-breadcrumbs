import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, from } from 'rxjs';



// Angular makes it impossible to make modules optional :(

// try {
//   const _ = r('lodash');
//   _template = _.template;
//   _templateSettings = _.templateSetting
// } catch (e) {
//   try {
//     _template = r('lodash.template');
//     _templateSettings = r('lodash.templatesettings');
//   } catch (e) {
//     _template = (y) => (x) => y;
//     _templateSettings = {};
//   }
// } finally {
//   _templateSettings.interpolate = /{{([\s\S]+?)}}/g;
// }

export interface IBreadcrumb {
  text: string;
  path: string;
}

function makeTemplate(templateString: string) {
  return (templateData: unknown) =>
    new Function(`{${Object.keys(templateData).join(',')}}`, 'return `' + templateString + '`')(templateData);
}

export function stringFormat(_template: string, binding: any): string {
  const compiled = makeTemplate(_template);
  return compiled(binding);
}

export function isPromise(value: any): boolean {
  return value && (typeof value.then === 'function');
}

export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>)
  : Observable<T> {

  if (value instanceof Observable) {
    return value;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }

  return of(value as T);
}
