import { AfterViewChecked, AfterViewInit, Component, OnInit,  Input, ViewChild, Host } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ActivatedRoute, Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';

import { LocalStorageService } from '@shared/services/local-storage.service';
import { WathStepsLearningService } from '../../../steps-learning/services/wath-steps-learning.service';
import { WatchService } from '../../../steps-learning/verifying-ce/services/watch.service';
import { catchError, of } from 'rxjs';
import { DragWordsComponent } from '../ui/drag-words/drag-words.component';
import { GameService } from '../../game.service';
import { AudioService } from '@shared/services/audio.service';




@Component({
  selector: 'zan-puzzle-letters',
  templateUrl: './puzzle-letters.component.html',
  styleUrls: ['./puzzle-letters.component.scss']

})
export class PuzzleLettersComponent implements OnInit {

  form!: FormGroup;
  list_Words_API: Array<{ espaniol: string, value: number, ingles: string,wordstouser:Array<string> ,audio:string }> = [];
  list_Words_View: Array<{ espaniol: string, value: number, ingles: string  ,wordstouser:Array<string> }> = [];
  list_Words_process: Array<{ espaniol: string, value: number, ingles: string }> = [];

  list_words_guessed: Array<string> = [];
  list_grades_guessed: Array<number> = [];

  listTxt: Array<{ value: string }> = [];

  lbl_Div: string = "";
  lbl_Averge: string = "0";

  Input_DataList: string[] = [];
  INPUT_PLACE_HOLDER = "WORDS";



  lbl_Grade: number = 100;
  lbl_GradeTotal: number = 0;



  wordInProcessIndex: number = 0;
  wordInProcessEnglish: string = "";
  wordInProcessEnglishDrag: string = "";

  btn_visible: boolean = false;
  totalWords: number = 0;

  TotalWordsAPI: number = 0;

  context: AudioContext = new AudioContext();
  oscillatorObj: OscillatorNode = this.context.createOscillator();

  openSpinner: boolean = false;

  ViewOpen: String = "guess";
  public msjParamsAlert: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string }> = [];

  selectedLang="";
  koGame="PUT_TOGETHER_WORD";
  link="";
  constructor(private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
    protected fieldValidate: FieldValidateService,
    private router: Router,
    private wathSteps: WathStepsLearningService,
    private watchService: WatchService,
     private gameService : GameService,
     private audioService: AudioService) { }




  ngOnInit(): void {

this.getConfig();

    this.fn_ShowMessage("", false, "", "", false);



  }//------------------------------------------------------------------

  getConfig() {
    this.uiOperGrService.getInfoUser().subscribe((resp: any) => {

      // console.log("----- response API ------------",resp);
      this.selectedLang  = resp.selected_lang;

    });
  } //------------------------------------------------



  get_Words_list() {
    //------- Objetivo : regresa la lista de palabras a calcular
    //------- 28 julio 2023


    for (let i = 0; i <= this.totalWords - 1; i++) {
      this.list_Words_View.push(this.list_Words_API[i]);
    }

  }//-----------------------------------------------------------------

  getWordsInProcess()
  {
      //--- objetivo : palabra que se estara evaluando
      //--- EricZan : 04Sep2023


    let _Palabra_ingles: string = "";


    if (this.wordInProcessIndex < this.totalWords)
    {

      _Palabra_ingles = this.list_Words_View[this.wordInProcessIndex].ingles.toString();
     this.Input_DataList =  this.list_Words_View[this.wordInProcessIndex].wordstouser;
     this.gameService.CLEAR_LIST$.next(true);
      this.list_words_guessed.push(_Palabra_ingles);

      if ( this.list_Words_process.length >= 10){ this.list_Words_process = [];}
      this.list_Words_process.push(this.list_Words_View[this.wordInProcessIndex]);


      this.wordInProcessEnglish = this.list_Words_View[this.wordInProcessIndex].ingles;
      this.link = this.list_Words_API[this.wordInProcessIndex].audio;


    }


    //------------ termina el juegooo ----------
    if (this.wordInProcessIndex === this.totalWords) {

      this.playAudio(this.link,false);

      this.btn_visible = false;
      this.fn_Save_Data_API();


      return;


    }

  }//-----------------------------------------------------------------

  fn_Router() {

    this.router.navigate(['../home/main/games']);

  }




  fn_Save_Data_API() {

    let _average: Number = (this.lbl_GradeTotal / this.wordInProcessIndex);
    let _userId: string = "";
    let _qtywords: number = 0;



    this.openSpinner = true;
    this.uiOperGrService.getGamesAA_Archive_2({
      orgId: "DTL-01",
      subcat: 0,
      words: this.list_words_guessed,
      grades:this.list_grades_guessed,
      average: _average.toString(),
      kogame: "PUT_TOGETHER_WORD",
    }).subscribe((resp: any) => {
      // console.log("---------- respondio guardar datos api ---------");
      // console.log(resp);
      this.list_Words_API = resp.map((value: any) => ({
        _userId: value.userId,
        _qtywords: value.qtywords,

      })), catchError(e => {
        // console.log('----- erro API ----');
        this.openSpinner = false;
        return of(null);
      });


      this.openSpinner = false;

      this.fn_ShowMessage("Exito", true, this.gameService.getTraslateAlert(this.selectedLang,"goodJob"), "", false);

      if (this.list_Words_API.length > 0) {
        // console.log(_userId);
        // console.log(_qtywords);

      }
      else { this.fn_erroAPI(); }

    }
      , (_error) => {

        // console.log('----- erro API  (2)----');
        // console.log(_error);

        let _msj = _error.error.detail.toString();
        this.openSpinner = false;
        this.fn_ShowMessage("Error", true, this.gameService.getTraslateAlert(this.selectedLang,"http"), _msj, false);
        return;

      }
    );



  }//_------------------------------------------------------------------------------------------------




  fn_erroAPI() {

    // console.log('------ erro api ----');

    this.fn_ShowMessage("Error", true, this.gameService.getTraslateAlert(this.selectedLang,"error"), " contact admin", false);
    return;


  }//----------------------------------------------

  fn_StarGame() {


    this.get_Words_list(); //-- si todo bien carga la lista de palabras


    this.lbl_Div = "1 / " + this.totalWords.toString();
    this.lbl_Averge = "0";

    this.getWordsInProcess(); //-------palabra q se va  a procesar



    this.btn_visible = true;

  }//--------------------------------------------


  fn_StarGame_Input(_list_Words_API: Array<{ espaniol: string, value: number, ingles: string ,wordstouser:Array<string>,audio:string }>) {



    this.list_Words_API = _list_Words_API;


    if (this.list_Words_API.length > 0)
    {

      this.TotalWordsAPI = this.list_Words_API.length;
      if (this.TotalWordsAPI !== this.totalWords)
      {
        this.totalWords = this.TotalWordsAPI;

      }


      this.fn_StarGame(); //-- function


    }



  }//--------------------------------------------


  fn_Validate_click() {



    if (this.wordInProcessEnglish.trim().toLowerCase() !== this.wordInProcessEnglishDrag.trim().toLowerCase()) {



      this.lbl_Grade = (this.lbl_Grade - 10) < 0 ? 0 : this.lbl_Grade - 10;

      if (this.lbl_Grade<=0)
      {this.fn_ShowMessage("Alert", true,  this.gameService.getTraslateAlert(this.selectedLang,"triyingWord",this.wordInProcessEnglish), "", true);}
      else {this.fn_ShowMessage("Alert", true, this.gameService.getTraslateAlert(this.selectedLang,"tryAgain"), "", true);}

      return;
    }




    this.wordInProcessIndex += 1;
    this.lbl_Div = this.wordInProcessIndex + " / " + this.totalWords.toString();

    this.lbl_GradeTotal += this.lbl_Grade;

    this.lbl_Averge = (this.lbl_GradeTotal / this.wordInProcessIndex).toFixed(2).toString();


    if (this.wordInProcessIndex < this.totalWords) {
      this.playAudio(this.link,false);
      this.fn_ShowMessage("Success", true, this.gameService.getTraslateAlert(this.selectedLang,"isRight"), "", false);
    }


    this.list_grades_guessed.push(this.lbl_Grade);

    this.lbl_Grade = 100;


    this.getWordsInProcess();

  }//----------------------------------------------------------------------


  fn_DataLisOutput(_letters: Array<string>)
  {
    let _data ="";
    this.wordInProcessEnglishDrag ="";

    _letters.forEach( function(_value) {
      _data= _data+  _value;


  });

  this.wordInProcessEnglishDrag = _data;

  }//-----------------------------------------------------




  doing_beep(long_of_beep: number, freq: number) {

    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = freq;
    oscillator.connect(context.destination);
    oscillator.start();

    setTimeout(function () { oscillator.stop(); }, long_of_beep);
  }//-----------------------------------------------------------------------------------------


  fn_ShowMessage(_TypeMessge: string, _ShowAlert: boolean, _Messge: string, _Comment: string, _Sound: boolean) {

    if (_Sound) {
      if (_TypeMessge === "Error" || _TypeMessge === "Alert") { this.doing_beep(400, 350); }
      else { this.doing_beep(200, 800); }

    }


    this.msjParamsAlert = [{ TypeMessge: _TypeMessge, ShowAlert: _ShowAlert, Messge: _Messge, Comment: _Comment }];
  }//------------------------------------------------------------


  audioCurrent: boolean = false;
  playAudio(link: string ,discount:boolean) {
  {



    if (this.audioCurrent) {    return;  }
    this.audioService.playAudio(link.replace("'",""));

      if(discount){
        this.lbl_Grade = (this.lbl_Grade - 10) < 0 ? 0 : this.lbl_Grade - 10;
          if (this.lbl_Grade <= 0 ) {this.fn_ShowMessage("Alert", true, this.gameService.getTraslateAlert(this.selectedLang,"triyingWord",this.wordInProcessEnglish), "", true);}

      }
    }
  }


}//++++++++++++++++++++++  principal +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




