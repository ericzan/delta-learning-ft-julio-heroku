import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelStep'
})
export class LevelStepPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const result = String(value);
    switch (result) {
      case '0':
      case '1':
        return 'Learning';
      case '2':
        return 'verifying-vw';
      case '3':
        return 'verifying-ls';
      case '4':
        return 'verifying-ce';
      case '5':
        return 'Validating';
      default:
        if(value === null){
          return 'Learning';
        }
        return '';
    }
  }

}
