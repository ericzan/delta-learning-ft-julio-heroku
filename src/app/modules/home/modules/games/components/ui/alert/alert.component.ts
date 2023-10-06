import { Component, Input, OnInit } from '@angular/core';
import { WathStepsLearningService } from '../../../../steps-learning/services/wath-steps-learning.service';
import { WatchService } from '../../../../steps-learning/verifying-ce/services/watch.service';

import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'zan-games-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})
export class AlertComponent implements OnInit {

  ShowAlert: boolean = false;
  lbl_Msj: string = "";
  lbl_Commnet: string = "";
  styleObj: string = "";



  @Input()
  public inputo_MsjParams: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string }> = [];


  constructor(
    private wathSteps: WathStepsLearningService,
    private watchService: WatchService,
    private router: Router,) { }


  ngOnInit(): void {



  }//------------------------------------------------------------------


  Hidden_Msj() {

    // console.log('tipo msj -------- >' + this.inputo_MsjParams[0].TypeMessge);

    if (this.inputo_MsjParams[0].TypeMessge === "Exito") {
      // console.log(' ------- va acerrar --------- ');
      this.fn_Router();
    }

    this.inputo_MsjParams = [{ TypeMessge: "Alert", ShowAlert: false, Messge: "", Comment: "" }];


  } //--------------------------------------------------------


  fn_Router() {

    // console.log("--- viene de la pagina : " )
    window.location.reload();

  }



}
