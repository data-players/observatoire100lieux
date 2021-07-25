import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nocarriage'
})
export class NocarriagePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace( /(<([^>]+)>)/ig, ' ').replace('\\n', ' ');
  }

}
