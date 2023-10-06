import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { RedirectGuard } from './redirect-guard.guard';
import { catchError, of } from 'rxjs';
import { Translatei18Service } from '@core/services/translatei18.service';





@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [RedirectGuard],

})
export class SignInComponent implements OnInit, AfterViewInit {
  structureForm!: FormGroup;
  modalForm!: FormGroup;
  messageError: string = '';
  @ViewChild(LoadingComponent) loading!: LoadingComponent;

  ShowDialog = false;
  modalTitle = "";
  modalTitle02 = "";
  price_complete = 0;
  price_cupon = 0;
  cupon = "";
  DescriptionCupon = "";
  acuerdo = "";
  selected_lang = "";
  buttonAceptar = "Continuar";
  buttonCancelar = "Cancelar";
  cobLabel = "";
  updateLicense = "Actualizar licencia";

  list_Promos: Array<{ KoLic: string, cupon: string, description: string, price: number, price_cupon: number, value: string }> = [];
  listCategories: Array<{ label: string, value: string }> = [];
  stripe_url = "";
  showLabel = true;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    protected fieldValidate: FieldValidateService,
    private http: HttpClient,
    private storageService: LocalStorageService,
    private translate: TranslateService,
    private redirectGuard: RedirectGuard,
    private translatei18Service: Translatei18Service

  ) {
    this.structureForm = this.fb.group({
      username: [, [Validators.required]],
      password: [, [Validators.required]]
    });

    this.modalForm = this.fb.group({
      cboListOptions: [, [Validators.required]],

    });
    ;
  }
  ngOnInit(): void { }


  ngAfterViewInit(): void { }

  submit(_login: boolean) {
    if (this.structureForm.invalid) {
      this.structureForm.markAllAsTouched();
      return;
    }

    this.showLabel = _login;

    this.loading.setDisplay(true);
    this.messageError = '';
    const userName:string = this.structureForm.value.username;
    const password:string = this.structureForm.value.password;
    this.http.post(`${environment.apiUrl}/dt/auth/login/`, {
      userId: userName.trim(),
      password: password.trim()
    }).subscribe((resp: any) => {

      debugger;

      this.saveDataLogIn(userName.trim(), resp.token, resp.selected_lang);

      setTimeout(() => {
        this.loading.setDisplay(false);
        if (_login) { this.route.navigateByUrl('/home'); }
        else { this.options(); }
      }, 700);

    }, (error) => {

      this.statusError(error.status);

      //--------- ya se vencio la membresia
      if (error.status === 403) { this.options(); }

    });
  }//---------------------------------------------------------------------



  options() {

    if (this.structureForm.invalid) {
      this.structureForm.markAllAsTouched();
      return;
    }


    this.loading.setDisplay(true);

    this.ShowDialog = true;

    this.list_Promos = [];
    this.listCategories = [];
    let list_Promos: Array<{ KoLic: string, cupon: string, description: string, price: number, price_cupon: number, value: string }> = [];
    let _listCategories: Array<{ label: string, value: string }> = [];
    let _selected_lang = this.selected_lang;


    this.http.get(`${environment.apiUrl}/dt/auth/s_available_products/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': String(this.storageService.load(KeyStorage.token))
        }

      }).subscribe((resp: any) => {
        this.loading.setDisplay(false);
        this.translatei18Service.translate(this.selected_lang.toLowerCase());
        this.modalTitle = this.selected_lang == "es" ? resp.title.es : resp.title.en;
        this.modalTitle02 = this.selected_lang == "es" ? resp.title02.es : resp.title02.en;
        this.cobLabel = this.selected_lang == "es" ? resp.label01.es + ":" : resp.label01.en + ":";


        this.acuerdo = "De cuerdo a tu selección el monto a pagar seá de : $ ";
        if (
          this.selected_lang == "en") {
            this.acuerdo = "According to your selection, the amount to pay will be : $ ";
          this.buttonAceptar = "Continue";
          this.buttonCancelar = "Cancel";

        }

        // debugger;
        resp.Options.forEach(function (_item: any) {
              list_Promos.push({
                                KoLic: _item.KoLic, cupon: _item.cupon
                                ,description: _selected_lang == "es" ? _item.description.es : _item.description.en
                                ,price: _item.price, price_cupon: _item.price_cupon
                                ,value: _selected_lang == "es" ? _item.value.es : _item.value.en
                              });
              _listCategories.push({ label: _selected_lang == "es" ? _item.value.es : _item.value.en, value: _item.KoLic });

            });
        this.list_Promos = list_Promos;
        this.listCategories = _listCategories;

      },
      (error) => {  this.statusError(error.status);  });



  }//-------------------------------------------------------------------------------

  paymentCancel() {
    this.loading.setDisplay(false);
    this.ShowDialog = false;
  }//-------------------------------------------------------------------------------

  payment() {


    if (this.modalForm.invalid) {
      this.modalForm.markAllAsTouched();
      return;
    }

    const userName = this.structureForm.value.username;
    let _CvePromo = this.modalForm.value.cboListOptions;
    const _result = this.list_Promos.find(x => x.KoLic === _CvePromo);

    this.price_complete = _result!.price
    this.price_cupon = _result!.price_cupon
    this.cupon = _result!.cupon
    this.DescriptionCupon = _result!.description;

    let body: any = {
      userId: userName,
      KoLic: _CvePromo,
      price_complete: this.price_complete,
      price_cupon: this.price_cupon,
      cupon: this.cupon,
    }

    this.http.post(`${environment.apiUrl}/dt/auth/stripe_checkout/`, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': String(this.storageService.load(KeyStorage.token))
      }
    }).subscribe((resp: any) => {
      this.loading.setDisplay(false);
      let navigationExtras: NavigationExtras = { queryParams: { 'stripeURL': resp.stripe_url } };
      this.route.navigate(['paymentURL'], navigationExtras);
    },
    (error) => {  this.statusError(error.status); });


  }//-------------------------------------------------------------------------------

  descriptionCupon() {
    let _CvePromo = this.modalForm.value.cboListOptions;
    const _result = this.list_Promos.find(x => x.KoLic === _CvePromo);

    this.price_complete = _result!.price
    this.price_cupon = _result!.price_cupon
    this.cupon = _result!.cupon
    this.DescriptionCupon = _result!.description;

  }//-------------------------------------------------------------------------------

  saveDataLogIn(_user: string, _token: string, _lang: string) {
    this.storageService.save(KeyStorage.user, _user);
    this.storageService.save(KeyStorage.token, _token);
    this.selected_lang = _lang;
    this.translatei18Service.translate(_lang.toLowerCase());
  }

  statusError(_errorNumber: number) {

    this.loading.setDisplay(false);
    if (_errorNumber === 401) {
      setTimeout(() => {
        this.messageError = this.translate.instant('signin.form.message_invalid');
      }, 700)
      return;
    }

  }

}
