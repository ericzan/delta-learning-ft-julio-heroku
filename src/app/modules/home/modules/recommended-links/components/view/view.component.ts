
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
// import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent
  implements OnInit {


  userId: string = '';


  constructor(private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
    protected fieldValidate: FieldValidateService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: LocalStorageService,
    // private translate: TranslateService
    ) { }


  ngOnInit(): void {

    this.userId = String(this.storage.load(KeyStorage.user));

    this.router.navigate(['links'], { relativeTo: this.route });


  }//-----------------------------------------------------------------




}// --******************* principal *********************
