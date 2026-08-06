import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCamelcase',
})
export class CamelcasePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }
}
