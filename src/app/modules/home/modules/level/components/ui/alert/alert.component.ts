

import { Component, Input, OnInit } from "@angular/core";
import { WathStepsLearningService } from "../../../../steps-learning/services/wath-steps-learning.service";
import { WatchService } from "../../../../steps-learning/verifying-ce/services/watch.service";
import { Router } from "@angular/router";
import { LevelService } from '../../../level.service';





@Component({
  selector: 'zan-level-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})
export class AlertComponent implements OnInit {


  @Input()
  public inputo_MsjParams: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string, ShowConfirm: boolean }> = [];


  @Input()
  public ShowComfirm: boolean = true;


  ShowAlert: boolean = false;
  lbl_Msj: string = "";
  lbl_Commnet: string = "";






  constructor(
    private _LevelService: LevelService,
    private wathSteps: WathStepsLearningService,
    private watchService: WatchService,
    private router: Router,) { }


  ngOnInit(): void {

    this._LevelService.STOP$.subscribe(data => {
      // console.log(` ---- desde  vista hijo: ${data}`);
    });

  }//------------------------------------------------------------------

  Hidden_Cnf() {

    this.inputo_MsjParams = [{ TypeMessge: "Alert", ShowAlert: false, Messge: "", Comment: "", ShowConfirm: false }];

  }


  Hidden_Msj() {



    // console.log('tipo msj -------- >' + this.inputo_MsjParams[0].TypeMessge);

    if (this.inputo_MsjParams[0].TypeMessge === "Exito") {
      // console.log(' ------- va acerrar --------- ');
      this.fn_Router();
    }

    this.inputo_MsjParams = [{ TypeMessge: "Alert", ShowAlert: false, Messge: "", Comment: "", ShowConfirm: false }];


  } //--------------------------------------------------------


  fn_Router() {

    // console.log("--- viene de la pagina : "  )
    window.location.reload();


  }//----------------------------------



  fn_Stop() {
    //--- se llama al servicio, para indicar que oprimio STOP
    this._LevelService.STOP$.next(true);
    this.Hidden_Cnf();

  }//--------------------------

}
