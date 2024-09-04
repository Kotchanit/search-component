import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hightlight'
})
export class HightlightPipe implements PipeTransform {

  transform(value: string, searchKey: string): string {
    if (value && searchKey) {
      value = String(value)
      const start = value.toLowerCase().indexOf(searchKey.toLowerCase())
      if (start !== -1) {
        const matchingString = value.substr(start, searchKey.length)
        return value.replace(matchingString, "<span class='font-bold'>" + matchingString + "</span>")
      }
    }
    return value;
  }

}
