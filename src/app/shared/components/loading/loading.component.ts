import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  protected visible: any = false;
  constructor(private cd: ChangeDetectorRef){

  }
  setDisplay(value: boolean) {
    this.visible = value;
    this.cd.detectChanges();
  }
}
