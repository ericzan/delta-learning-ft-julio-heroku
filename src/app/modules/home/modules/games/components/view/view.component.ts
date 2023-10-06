
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';




@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent
  implements OnInit {

  listCategories: Array<{ label: string, value: number }> = [];
  listSubCategories: any[] = [];
  form!: FormGroup;
  resp: any[] = [];
  userId: string = '';
  selectedLang="";

  constructor(private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
    protected fieldValidate: FieldValidateService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: LocalStorageService) { }


  ngOnInit(): void {
    this.userId = String(this.storage.load(KeyStorage.user));
    this.getConfig();
    this.form = this.fb.group({
      cboGame: [, [Validators.required]],
    })
  }//-----------------------------------------------------------------

  getConfig() {
    this.uiOperGrService.getInfoUser().subscribe((resp: any) => {

      // console.log("----- response API ------------",resp);
      this.selectedLang  = resp.selected_lang;
      this.getCategories(this.selectedLang);

    });
  }

  getCategories(lang:string) {

    if (lang=="en")
    {
      this.listCategories.push(
        { label: "Letters puzzle", value: 1 },

        { label: "Trying The Word", value: 2 },
        { label: "Guess The Word", value: 3 },
        { label: "Words puzzle", value: 4 });

    }
    else
    {
      this.listCategories.push(
        { label: "Rompecabezas de letras", value: 1 },
        { label: "Intentando la palabra", value: 2 },
        { label: "Adivina la palabra", value: 3 },

        { label: "Rompecabezas de palabras", value: 4 });

    }

  }//-----------------------------------------------------------------

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    let liSelected = this.form.value;

    // console.log(liSelected.cboGame);

    switch (liSelected.cboGame) {
      case 1: {

        this.router.navigate(['puzzle-letters'], { relativeTo: this.route });
        break;
      }
      case 2: {
        this.router.navigate(['trying'], { relativeTo: this.route });

        break;
      }
      case 3: {
        this.router.navigate(['guess'], { relativeTo: this.route });
        break;
      }
      case 4: {
        this.router.navigate(['puzzle-words'], { relativeTo: this.route });
        break;
      }
    }



  }//-----------------------------------------------------------------


}
