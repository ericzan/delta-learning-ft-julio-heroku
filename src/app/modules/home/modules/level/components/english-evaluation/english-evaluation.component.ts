
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import { HowManyWordsComponent } from './../../../games/components/ui/how-many-words/how-many-words.component';
import { LevelService } from '../../level.service';


@Component({
  selector: 'app-english-evaluation',
  templateUrl: './english-evaluation.component.html',
  styleUrls: ['./english-evaluation.component.scss']
})
export class EnglishEvaluationComponent implements OnInit {

  public p_AbrirSpinner: boolean = false;
  form!: FormGroup;
  List_Words_Level: Array<{ word: string, prevmax: number, comment: string }> = [];

  limitNo: number = 10;
  tartonNo: number = 0;
  setlevelNo: boolean = false;
  public msjParamsAlert: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string, ShowConfirm: boolean }> = [];

  viewObj: String = "guess";
  verAyuda = false;

  //*********** constructor *********** */
  constructor(private _LevelService: LevelService,
    private uiOperGrService: UiOperGrService,
    private router: Router) { }

  ngOnInit(): void {

    this.p_AbrirSpinner = true;
    this.fn_ShowMessage_msj("", false, "", "", false, false);

    this.fn_SearchData_API();
    //this.fn_BuscaDatos_Mnual();



    this._LevelService.STOP$.subscribe(data => {
      if (data) {
        // console.log(` ---- entro if: ${data}`);
        this._LevelService.STOP$.next(false);
        this.fn_Save_API();
      }

      // else { console.log(` ---- entro else: ${data}`); }

    });


  }

  fn_Save_API() {

    this.setlevelNo = true;
    this.fn_SearchData_API();
    window.location.reload();
    // console.log("------- termina proceso-----------" + this.tartonNo);
    // this.router.navigate(['../home/main/progress']);

  }//----------------------------------

  fn_SearchData_API() {

    this.p_AbrirSpinner = true;

    debugger;
    this.uiOperGrService.getleval({
      orgId: "DTL-01",
      starton: this.tartonNo,
      limit: this.limitNo,
      word: "",
      setlevel: this.setlevelNo,
    }).subscribe((resp: any) => {
      // console.log("- ---- respondio busqueda api------");
      // console.log(resp);
      this.List_Words_Level = [];


      //--- si  espara busqueda nada mas ---
      if (!this.setlevelNo) {

        this.List_Words_Level = resp.map((item: any) => ({
          word: item.word.trim(),
          prevmax: item.prevmax,
          comment: "",
        }
        )), catchError(e => {
          // console.log('----- erro API  catchError ----');
          this.p_AbrirSpinner = false;
          return of(this.fn_BuscaDatos_Blanco());
        });


        // console.log('----- salio del map----');
        this.p_AbrirSpinner = false;
        if (this.List_Words_Level.length <= 0) {

          this.fn_BuscaDatos_Blanco();
          this.fn_ShowMessage_msj("Error", true, " Error", " You don't have words archived!!!!", false, false);
        }

      }

      debugger;

    }, (_error) => {
      // console.log('----- erro API  (2)----');
      // console.log(_error);
      let _msj = "";

      try { _msj = _error.error.detail.toString(); }
      catch (e: any) {
        _msj = " Error http://";
        this.fn_BuscaDatos_Blanco();
      }
      finally { }


      this.p_AbrirSpinner = false;
      this.fn_ShowMessage_msj("Error", true, "Communication error http:// ", _msj, false, false);
      return;

    }

    ); //---- suscribe


  }//---------------------------------------------------




  fn_BuscaDatos_Mnual() {
    this.List_Words_Level.push(
      { word: "casa", prevmax: 1, comment: "" },
      { word: "perro", prevmax: 2, comment: "" },
      { word: "azul", prevmax: 3, comment: "" },
      { word: "nuevo", prevmax: 4, comment: "" },
      { word: "brincar", prevmax: 5, comment: "" },
      { word: "otro", prevmax: 6, comment: "" },
      { word: "madre", prevmax: 7, comment: "" },
      { word: "automovil", prevmax: 8, comment: "" },
      { word: "rosa", prevmax: 9, comment: "" },
      { word: "telefono", prevmax: 10, comment: "" },
    );


  }//_---------------------------------------------


  fn_BuscaDatos_Blanco() {
    this.List_Words_Level = [];
    this.List_Words_Level.push(
      { word: "", prevmax: 1, comment: "" },
      { word: "", prevmax: 2, comment: "" },
      { word: "", prevmax: 3, comment: "" },
      { word: "", prevmax: 4, comment: "" },
      { word: "", prevmax: 5, comment: "" },
      { word: "", prevmax: 6, comment: "" },
      { word: "", prevmax: 7, comment: "" },
      { word: "", prevmax: 8, comment: "" },
      { word: "", prevmax: 9, comment: "" },
      { word: "", prevmax: 10, comment: "" },
    );


  }//_---------------------------------------------


  fn_more_10() {
    this.tartonNo = this.tartonNo + 10;

    this.fn_SearchData_API();
  }//----------------------------------------------

  fn_more_100() {
    this.tartonNo = this.tartonNo + 100;

    this.fn_SearchData_API();
  }//----------------------------------------------

  fn_less_10() {
    this.tartonNo = this.tartonNo - 10;
    if (this.tartonNo < 0) this.tartonNo = 0;

    this.fn_SearchData_API();
  }//----------------------------------------------

  fn_less_100() {
    this.tartonNo = this.tartonNo - 100;
    if (this.tartonNo < 0) this.tartonNo = 0;

    this.fn_SearchData_API();
  }//----------------------------------------------


  fn_ShowMessage_msj(_TypeMessge: string, _ShowAlert: boolean, _Messge: string, _Comment: string, _Sound: boolean, _ShowConfirm: boolean) {

    this.msjParamsAlert = [{ TypeMessge: _TypeMessge, ShowAlert: _ShowAlert, Messge: _Messge, Comment: _Comment, ShowConfirm: _ShowConfirm }];
  }//------------------------------------------------------------

  fn_ShowMessage_cnf() {

    this.fn_ShowMessage_msj("", false, "", "", false, true);
  }//--------------------------------------------------------

  fn_help() {

    this.verAyuda = !this.verAyuda;
  }
}//-----------------------------------------------------------
