import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'icuSafe' })
export class IcuSafePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/[{}]/g, '') : '';
  }
}
