import { Component, Input } from '@angular/core';

@Component({
  selector: 'zan-spinner',
  template: ` <div class="overlay"  *ngIf="input_abrirSpinner">
                    <div class="lds-hourglass"> </div>
              </div>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  @Input()
  public input_abrirSpinner: boolean = false;

}
