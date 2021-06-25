import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'castnumber'
})
export class CastnumberPipe implements PipeTransform {

  transform(value: any): number {
    return value as number;
  }

}
