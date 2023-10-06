import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent {
  @Input() item: any;
  @Output() close = new EventEmitter<boolean>();
  @Input() labelValue = '';
  constructor(private uiOperGrService: UiOperGrService) {
    
  }
  submit(){
    console.log(this.labelValue);
    this.uiOperGrService.setNamePackage(this.item.packageId, this.labelValue).subscribe( resp => {

      this.close.emit(true);
    });
  }
}
