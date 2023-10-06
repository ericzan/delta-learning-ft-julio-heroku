import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss']
})
export class DialogErrorComponent {
  protected visible: boolean = false;
  protected error: any = {};
  constructor(private cd: ChangeDetectorRef){

  }
  setDisplay(value: boolean, error: any = {}) {
    this.error = error;
    this.visible = value;
    this.cd.detectChanges();
  }
}
