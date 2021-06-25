import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caststring'
})
export class CaststringPipe implements PipeTransform {

  transform(value: any): string {
    return value as string;
  }

}
