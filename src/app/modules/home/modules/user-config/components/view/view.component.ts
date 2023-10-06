import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldValidateService } from '@core/services/field-validate.service';
import { HttpService } from '@core/services/http.service';
import { Translatei18Service } from '@core/services/translatei18.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [MessageService]
})
export class ViewComponent implements AfterViewInit {
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  form!: FormGroup;
  formPassword!: FormGroup;
  frmContact!:FormGroup;
  listLenguage = [
    {    label: 'Español / Spanish',    value: 'es'    },
    {    label: 'Inglés / English',    value: 'en'    }
  ]
  mailIni="";
  mailIniAlternate?="";
  userId="";
  koflic="";
  listContries: Array<{ label: string, value:string }> = [];
  listLanguages: Array<{ label: string, value:string }> = [];
  countryBirth="";
  constructor(
    protected fieldValidate: FieldValidateService,
    private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
    private messageService: MessageService,
    private translatei18Service: Translatei18Service
    ) {
    this.form = fb.group({
      username: [{value: '',disabled: true}, []],
      fullName: [{value: '',disabled: false},[Validators.required]],
      email: [{value: '',disabled: false},[Validators.required]],
      emailConfirm: [{value: '',disabled: false}, []],
      emailAlternate: [{value: '',disabled: false}, []],
      emailAlternateConfirm: [{value: '',disabled: false}, []],
      native_lang: [{value: '',disabled: false}, []],
      country_birth: [{value: '',disabled: false}, []],
      country_res: [{value: '',disabled: false}, []],
      selected_lang: [null, Validators.required],

    });
    this.formPassword = this.fb.group({
      currentPassword: [{value: '',disabled: false},[Validators.required]],
      newPassword: [,[Validators.required]],
      newPasswordConfim: [,[Validators.required]],
    });
    this.frmContact = this.fb.group({
      contactId: [{value: '',disabled: true}, []],
      contactEmail: [{value: '',disabled: true}, []],
      contactName: [{value: '',disabled: true}, []],
    });
  }
  ngAfterViewInit(): void {
    this.loading.setDisplay(true);
    this.getConfig();
  }
  submit() {

  }
  selectedLenguage(event: any){
    // console.log(event.value);
    this.translatei18Service.translate(event.value);
  }
  submitPassword() {
    if(this.formPassword.invalid){
      this.formPassword.markAllAsTouched();
      return;
    }
    this.loading.setDisplay(true);

    if (this.formPassword.value.newPassword != this.formPassword.value.newPasswordConfim){
      this.loading.setDisplay(false);
      this.messageService.add({ severity: 'error', summary: 'Actualización password', detail: 'Password no coinciden' });
      return;
    }

    this.uiOperGrService.changePassword({
      oldkeypass: this.formPassword.value.currentPassword,
      newkeypass: this.formPassword.value.newPassword,
    }).subscribe( resp => {
      this.loading.setDisplay(false);
      this.messageService.add({ severity: 'info', summary: 'Actualización', detail: 'Se ha actualizado exitosamente tu contraseña' });
      window.location.reload();
    }, error => {
      this.loading.setDisplay(false);
      this.messageService.add({ severity: 'error', summary: 'Actualización', detail:  error.error.detail});
    })
    // console.log(" ---changePassword--- ", this.formPassword.value);
  }
  getConfig() {
    this.uiOperGrService.getInfoUser().subscribe((resp: any) => {
    this.getCountries();
    this.getLanguages();

      // console.log("----- response API ------------",resp);
      let data: {
        birth_year: string,
        capacity: number,
        contactEmail: string,
        contactId: string,
        contactName: string,
        contactPhone: string,
        country_birth: string,
        country_res: string,
        month_year: string,
        name: string,
        native_lang: string,
        us_ctInsert: string,
        usemail: string,
        usemail_alt: string,
        userId: string,
        selected_lang: string,
        koflic: string,

      } = resp;
      this.form.patchValue({
        username: data.userId,
        fullName: data.name,
        email: data.usemail,
        emailConfirm: data.usemail,
        emailAlternate: data.usemail_alt,
        emailAlternateConfirm: data.usemail_alt,
        country_res: data.country_res,
        country_birth: data.country_birth,
        native_lang: data.native_lang,
        selected_lang:   data.selected_lang.toLowerCase(),
        currentPassword:"prueba"
      });
      this.frmContact.patchValue({
          contactEmail: data.contactEmail,
          contactId: data.contactId,
          contactName: data.contactName,
      });
      this.userId = data.userId;
      this.mailIni = !this.form.value.email?"":this.form.value.email.toLowerCase().trim();
      this.mailIniAlternate = !this.form.value.emailAlternate?"": this.form.value.emailAlternate.toLowerCase().trim();
      this.koflic  = !data.koflic?"UNIVERSAL": data.koflic;
      this.countryBirth = data.country_birth
      this.translatei18Service.translate(this.form.value.selected_lang.toLowerCase());
      this.loading.setDisplay(false);

    });
  }
  submitData(){



let _email = !this.form.value.email ? "":this.form.value.email.toLowerCase().trim();
let _emailConfirm = !this.form.value.emailConfirm ? "":this.form.value.emailConfirm.toLowerCase().trim();
let _emailAlternateConfirm=  !this.form.value.emailAlternateConfirm ? "" :this.form.value.emailAlternateConfirm.toLowerCase().trim() ;
let _emailAlternate =  !this.form.value.emailAlternate?"": this.form.value.emailAlternate.toLowerCase().trim()

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    if(this.mailIni != _email || _emailConfirm !="" ){
      if(_email != _emailConfirm){
        this.messageService.add({ severity: 'error', summary: 'Actualización', detail: "El mail y la confirmación no son iguales"});
        return;
      }
    }

    if (!this.isEMail(_email)){
        this.messageService.add({ severity: 'error', summary: 'Actualización', detail: "El mail no tiene el formato adecuado"});
        return;
    }


    if (_emailAlternate !="" || _emailAlternateConfirm != ""  )
    {
      if(this.mailIniAlternate != _emailAlternate || _emailAlternateConfirm != ""  ){
        if(_emailAlternate != _emailAlternateConfirm){
          this.messageService.add({ severity: 'error', summary: 'Actualización', detail: "el Mail alternativo y la confirmación no son iguales"});
          return;
        }
      }
      if (!this.isEMail(_emailAlternate)){
        this.messageService.add({ severity: 'error', summary: 'Actualización', detail: "El mail  alternativo no tiene el formato adecuado"});
        return;
      }
    }


debugger;


    this.uiOperGrService.setUserReg({
      userId: this.userId,
      orgId: "DTL-01",
      name: this.form.value.fullName.trim(),
      email: _email,
      email_alt: _emailAlternate,
      native_lang: this.form.value.native_lang.trim(),
      selected_lang:  this.form.value.selected_lang.trim(),
      country_birth: this.form.value.country_birth.trim(),
      country_res: this.form.value.country_res.trim(),
      kolic: this.koflic
    }).subscribe( resp => {
      this.loading.setDisplay(false);
      // console.log(resp);
      this.messageService.add({ severity: 'info', summary: 'Actualización', detail: 'Se actualizo la información' });
      window.location.reload();
    }, error => {
      this.loading.setDisplay(false);
      this.messageService.add({ severity: 'error', summary: 'Actualización', detail:  error.error.detail});
    });

  }
  isEMail(email: string):boolean {
    let mailValido = false;

      var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
  }
  getCountries(){
    // console.log('-----   contries ----');

    this.uiOperGrService.getCountries( ).subscribe( resp => {
      // console.log('-----   contries ----',resp);

      this.listContries = resp.map((value: any) => ({
                              label: value.country,
                              value: value.country,

                            })), catchError(e => {
                              // console.log('----- erro API  contries ----');
                              return of(null);
                            });

    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Paises', detail:  error.error.detail});
    });
  }

  getLanguages(){
    // console.log('-----   contries ----');

    this.uiOperGrService.getLanguages( ).subscribe( resp => {
      // console.log('-----   contries ----',resp);

      this.listLanguages = resp.map((value: any) => ({
                              label: value.language,
                              value: value.language,

                            })), catchError(e => {
                              // console.log('----- erro API  Languages ----');
                              return of(null);
                            });

    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Lenguajes', detail:  error.error.detail});
    });
  }


}
