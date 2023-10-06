import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';


import { WathStepsLearningService } from '../../../steps-learning/services/wath-steps-learning.service';
import { WatchService } from '../../../steps-learning/verifying-ce/services/watch.service';
import { catchError, of } from 'rxjs';
import { GameService } from '../../game.service';
import { AudioService } from '@shared/services/audio.service';



@Component({
  selector: 'zan-trying-the-word',
  templateUrl: './trying-the-word.component.html',
  styleUrls: ['./trying-the-word.component.scss']
})


export class TryingTheWordComponent implements OnInit {

  form!: FormGroup;
  list_Words_API: Array<{ espaniol: string, value: number, ingles: string,audio:string }> = [];
  list_WordsviewOpen: Array<{ espaniol: string, value: number, ingles: string }> = [];
  list_Words_process: Array<{ espaniol: string, value: number, ingles: string }> = [];

  wordInProcess: Array<{ letra: string, item: number }> = [];
  Palabra_calculando: Array<string> = [];


  list_words_guessed: Array<string> = [];
  list_grades_guessed: Array<number> = [];
  listTxt: Array<{ value: string }> = [];

  lbl_Div: string = "";




  lbl_Averge: string = "0";
  lbl_AvergeTotal: string = "0";
  lbl_Grade: number = 100;
  lbl_GradeTotal: number = 0;



  wordInProcessindex: number = 0;
  wordInProcessEnglish: string = "";

  btn_visible: boolean = false;
  totalWords: number = 0;

  totalWordsAPI: number = 0;

  context: AudioContext = new AudioContext();
  oscillatorObj: OscillatorNode = this.context.createOscillator();

  lbl_Trided: string = "";
  lbl_English_Word: string = "";
  openSpinner: boolean = false;
  viewOpen: string = "trying";

  public msjParamsAlert: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string }> = [];
  selectedLang="";
  koGame="TRY_TW";
link="";
  constructor(private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
    protected fieldValidate: FieldValidateService,
    private router: Router,
    private wathSteps: WathStepsLearningService,
    private watchService: WatchService,
    private gameService:GameService,
    private audioService: AudioService) { }


  ngOnInit(): void {
    //throw new Error('Method not implemented.');


    this.form = this.fb.group({

      txt_Try_With: new FormControl({ value: '', disabled: false }),

    })


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
      this.list_WordsviewOpen.push(this.list_Words_API[i]);
    }

  }//-----------------------------------------------------------------

  getWordsInProcess() {


    let _Palabra_ingles: string = "";


    //--- agrega la palabra a la lista q se muestra
    if (this.wordInProcessindex < this.totalWords)
    {

      _Palabra_ingles = this.list_WordsviewOpen[this.wordInProcessindex].ingles.toString();
      this.list_words_guessed.push(_Palabra_ingles);

      if(this.list_Words_process.length >=10){this.list_Words_process =[];}
      this.list_Words_process.push(this.list_WordsviewOpen[this.wordInProcessindex]);


      this.wordInProcessEnglish = this.list_WordsviewOpen[this.wordInProcessindex].ingles;
      this.link = this.list_Words_API[this.wordInProcessindex].audio;

      this.fn_Inicializa_Palabra(_Palabra_ingles);

    }


    //------------ termina el juegooo ----------
    if (this.wordInProcessindex === this.totalWords) {
      this.playAudio(this.link,false);
      this.form.get('txt_Try_With')?.disable();
      this.btn_visible = false;
      this.fn_SaveDataAPI();
      // setTimeout(() => { this.fn_Router() }, 3000);


      return;


    }

  }//-----------------------------------------------------------------

  fn_Router() {

    this.router.navigate(['../home/main/games']);

  }


  fn_SaveDataAPI() {





    let _average: Number = (this.lbl_GradeTotal / this.wordInProcessindex);

    let _userId: string = "";
    let _qtywords: number = 0;



    this.openSpinner = true;

    this.uiOperGrService.getGamesAA_Archive_2({
      orgId: "DTL-01",
      subcat: 0,
      words: this.list_words_guessed,
      grades:this.list_grades_guessed,
      average: _average.toString(),
      kogame: "TRY_TW",
    }).subscribe(
      (resp: any) => {

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

                        //---- cuerra msj ----
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

                        this.fn_ShowMessage("Error", true,  this.gameService.getTraslateAlert(this.selectedLang,"http"), _msj, false);

                        return;

                      }
    );



  }//_------------------------------------------------------------------------------------------------





  fn_erroAPI() {

    // console.log('------ erro api ----');

    this.fn_ShowMessage("Error", true,   this.gameService.getTraslateAlert(this.selectedLang,"error"), " contact admin", false);
    return;

  }//----------------------------------------------
  fn_StartGame() {


    this.get_Words_list(); //-- si todo bien carga la lista de palabras


    this.lbl_Div = "1 / " + this.totalWords.toString();
    this.lbl_Averge = "0";

    this.getWordsInProcess();



    this.btn_visible = true;

  }//--------------------------------------------

  fn_StartGame_Input(_list_Words_API: Array<{ espaniol: string, value: number, ingles: string,audio:string }>) {

    this.list_Words_API = _list_Words_API;


    if (this.list_Words_API.length > 0) {

      this.totalWordsAPI = this.list_Words_API.length;
      if (this.totalWordsAPI !== this.totalWords) {
        this.totalWords = this.totalWordsAPI;
        this.form.get('txt_how')?.setValue(this.totalWordsAPI.toString());
      }


      this.fn_StartGame(); //-- function


    }



  }//--------------------------------------------


  fn_Validate_click() {



    if (!this.fn_BuscaLetras(this.form.value.txt_Try_With.toString().trim().toLowerCase()))
    {
      this.doing_beep(400, 350);
      this.lbl_Grade = (this.lbl_Grade - 10) < 0 ? 0 : this.lbl_Grade - 10;
      this.form.get('txt_Try_With')?.reset();
      if (this.lbl_Grade <= 0 ) {this.fn_ShowMessage("Alert", true, this.gameService.getTraslateAlert(this.selectedLang,"triyingWord",this.wordInProcessEnglish), "", true);}

      return;
    }


    // this.doing_beep(200, 800);

    this.form.get('txt_Try_With')?.reset();


    //--- si  ya se adivinaron todas las vocales sigue a la siguiente palabra
    if (this.fn_FinLetras()) { return; }

    this.wordInProcessindex += 1;
    this.lbl_Div = this.wordInProcessindex + " / " + this.totalWords.toString();

    this.lbl_GradeTotal += this.lbl_Grade;

    this.lbl_Averge = (this.lbl_GradeTotal / this.wordInProcessindex).toFixed(2).toString();

    this.list_grades_guessed.push( this.lbl_Grade);
    this.lbl_Grade = 100;




    if (this.wordInProcessindex < this.totalWords) {
      this.playAudio(this.link,false);
      this.fn_ShowMessage("Success", true,  this.gameService.getTraslateAlert(this.selectedLang,"isRight")  , "", false);
    }

    this.getWordsInProcess();





  }//-----------------------------------------------------------------------





  fn_Inicializa_Palabra(_palabra: string) {

    // -- reinicia las variables
    this.wordInProcess.splice(0, this.wordInProcess.length);
    this.Palabra_calculando.splice(0, this.Palabra_calculando.length);
    this.lbl_Trided = "";
    this.lbl_English_Word = "";


    let li: number = -1;

    for (let _letra of _palabra) {
      li = li + 1;
      this.wordInProcess.push({ letra: _letra, item: li });
      this.Palabra_calculando.push("_");

    }

    this.fn_BuscaLetras("|");
  }//------------------------------------------------------------

  fn_BuscaLetras(_Letra: string) {
    let _Result: boolean = false;
    let li: number = -1;
    let a_Comodin = this.Palabra_calculando;
    if (_Letra !== "|") { this.lbl_Trided = this.lbl_Trided + _Letra + " , "; }


    this.wordInProcess.forEach(function (_value) {

      if (_value.letra.toLowerCase() === _Letra.toLowerCase()) {
        a_Comodin[_value.item] = _Letra
        _Result = true;
      }


    });

    this.Palabra_calculando = a_Comodin;

    let _x: string = "";
    this.Palabra_calculando.forEach(function (_value) {
      _x = _x + _value + " ";

    });

    this.lbl_English_Word = _x;

    return _Result;

  } //--------------------------------------------------------------------

  fn_FinLetras() {

    let _Result = false;
    this.Palabra_calculando.forEach(function (_value) {

      if (_value.toLowerCase() === "_") { _Result = true; }


    });

    return _Result;
  } //--------------------------------------------------------------------------------


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
  playAudio(link: string,discount:boolean) {


    if (this.audioCurrent) {    return;  }
    this.audioService.playAudio(link.replace("'",""));

    if (discount){

        this.lbl_Grade = (this.lbl_Grade - 10) < 0 ? 0 : this.lbl_Grade - 10;
    if (this.lbl_Grade <= 0 ) {this.fn_ShowMessage("Alert", true, this.gameService.getTraslateAlert(this.selectedLang,"triyingWord",this.wordInProcessEnglish), "", true);}

    }

  }


}//++++++++++++++++++++++  principal +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

