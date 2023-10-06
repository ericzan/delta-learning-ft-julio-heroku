import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldValidateService } from '@core/services/field-validate.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { catchError, of } from 'rxjs';
import { Translatei18Service } from '@core/services/translatei18.service';
import { GameService } from '../../../games/game.service';


@Component({
  selector: 'app-supportoth',
  templateUrl: './supportoth.component.html',
  styleUrls: ['./supportoth.component.scss']
})
export class SupportothComponent implements OnInit {

  form!:FormGroup;
  list_koh: Array<{ label: string, value: string }> = [];
  userId="";
  userName="";
  public msjParamsAlert: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string }> = [];
  openSpinner=false;
  selectedLang="";

  constructor(protected fieldValidate: FieldValidateService,
    private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
    private translatei18Service: Translatei18Service,
    private gameService:GameService
)
{

  this.form = this.fb.group({ selected_koh: [null],
    asunto: [{value: '',disabled: false},[Validators.required]],
    descripcion: [{value: '',disabled: false},[Validators.required]],  });


} //----------------------------------------------------------





  ngOnInit(): void
  {
    this.getConfig();

    this.fn_ShowMessage("", false, "", "");
    this.userData();


  }

  getConfig() {
    this.uiOperGrService.getInfoUser().subscribe((resp: any) => {

      // console.log("----- response API ------------",resp);
      this.selectedLang  = resp.selected_lang;

    });
  } //------------------------------------------------


fn_cancel(){

  window.location.reload();
}

fn_Send (){

let _classification = this.form.value.selected_koh.trim();
let _subject = this.form.value.asunto.trim();
let _longdescription = this.form.value.descripcion.trim();

if(this.form.invalid){
  this.form.markAllAsTouched();
  return;
}

  this.openSpinner = true;
  this.uiOperGrService.setAskForSupportoth({
    classification: _classification,
    subject: _subject,
    longdescription: _longdescription


  }).subscribe((resp: any) =>
  {
    // console.log("---------- respondio save datos api ---------");
    // console.log(resp);

    this.openSpinner = false;

    //this.fn_ShowMessage("Exito", true, "los datos se guardaron correctamente ","");
    window.location.reload();

  } , (error) => {

      // console.log('----- erro API  (2)----');
      // console.log(error);

      let _msj = error.error.detail.toString();
      this.openSpinner = false;

      this.fn_ShowMessage("Error", true,  this.gameService.getTraslateAlert(this.selectedLang,"http"), _msj);
      return;

    }
  );


}//----------------------------------

userData ()
{




this.openSpinner = true;
this.uiOperGrService.getTDT().subscribe((resp: any) =>
{
  // console.log("---------- respondio save datos api ---------");
  // console.log(resp);
  this.list_koh = resp.koh.map((value: any) => ({
                          label: value.text,
                          value: value.value
                                        })), catchError(e => {
                                          // console.log('----- erro API ----');
                                          this.openSpinner = false;
                                          return of(null);
                                        });


  this.openSpinner = false;

this.userId = resp.user;
this.userName = resp.name;

  if (this.list_koh.length > 0) { }
  else { this.fn_erroAPI(); }

} , (error) => {

    // console.log('----- erro API  (2)----');
    // console.log(error);

    let _msj = error.error.detail.toString();
    this.openSpinner = false;
    this.fn_ShowMessage("Error", true,  this.gameService.getTraslateAlert(this.selectedLang,"http"), _msj);
    return;

  }
);


}//---------------------



fn_ShowMessage(_TypeMessge: string, _ShowAlert: boolean, _Messge: string, _Comment: string ) {


  this.msjParamsAlert = [{ TypeMessge: _TypeMessge, ShowAlert: _ShowAlert, Messge: _Messge, Comment: _Comment }];
}//------------------------------------------------------------


fn_erroAPI() {

  console.log('------ erro api ----');

  this.fn_ShowMessage("Error", true, this.gameService.getTraslateAlert(this.selectedLang,"error"), " contact admin");
  return;


}//----------------------------------------------



}//  ************************* princpal ******************************************
