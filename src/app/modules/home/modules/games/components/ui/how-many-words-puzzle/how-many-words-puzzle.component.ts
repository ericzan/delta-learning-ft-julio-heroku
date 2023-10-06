import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { catchError, of } from 'rxjs';


import { ResponseZan } from '../../../data.interfaces';
import { wordstouserModel } from '../../../data.interfaces';
import { sentenceModel } from '../../../data.interfaces';
import { GameService } from '../../../game.service';

@Component({
  selector: 'zan-how-many-words-puzzle',
  templateUrl: './how-many-words-puzzle.component.html',
  styleUrls: ['./how-many-words-puzzle.component.scss']
})
export class HowManyWordsPuzzleComponent implements OnInit {

  responseListData: ResponseZan[] = [];

  @Output()
  public Output_list_Words_API_2: EventEmitter<ResponseZan[]> = new EventEmitter<ResponseZan[]>();

  @Output()
  public Output_list_Words_API = new EventEmitter<Array<{ espaniol: string, value: number, ingles: string }>>();

  list_Words_API: ResponseZan[] = [];
  list_words_guessed: Array<string> = [];
  list_grades_guessed: Array<number> = [];


  buttonSeleccted = "A1";
  disabled_button = false;


  formHowMatySentences!: FormGroup;
  totalWords: number = 0;
  public _MsjParams_Alert: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string }> = [];
  openSpinner: boolean = false;
  btn_start_visible: boolean = true;
  li_total_Palabras_API: number = 0;


  selectedLang="";






  constructor(private fb: FormBuilder, private uiOperGrService: UiOperGrService,
              private gameService : GameService) { }


  ngOnInit(): void {

    this.formHowMatySentences = this.fb.group({
      txt_how: new FormControl({ value: '0', disabled: false }),

    })

    this.getConfig();
    this.fn_ShowMessage('Alert', false, '', '', false);


  }//------------------------------------------------

  getConfig() {
    this.uiOperGrService.getInfoUser().subscribe((resp: any) => {

      // console.log("----- response API ------------",resp);
      this.selectedLang  = resp.selected_lang;

    });
  } //------------------------------------------------


  fn_ButtonSelected(_value: string) {

    this.buttonSeleccted = _value;

  }//-----------------------------------


  fn_Start_click() {



    this.totalWords = Number(this.formHowMatySentences.value.txt_how);

    //------- valida total de palabras
    if (this.totalWords === 0) {

      this.fn_ShowMessage('Alert', true, this.gameService.getTraslateAlert(this.selectedLang,"howManySentences"), '', false);
      return;
    }





    this.fn_BuscaDatos_API();
    //this.fn_BuscaDatos_Local();


  }//--------------------------------------------------------

  fn_ShowMessage(_TypeMessge: string, _ShowAlert: boolean, _Messge: string, _Comment: string, _Sound: boolean) {

    if (_Sound) {
      if (_TypeMessge === 'Error' || _TypeMessge === 'Alert') { this.doing_beep(400, 350); }
      else { this.doing_beep(400, 800); }

    }


    this._MsjParams_Alert = [{ TypeMessge: _TypeMessge, ShowAlert: _ShowAlert, Messge: _Messge, Comment: _Comment }];
  }//------------------------------------------------------------


  doing_beep(long_of_beep: number, freq: number) {

    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = freq;
    oscillator.connect(context.destination);
    oscillator.start();

    setTimeout(function () { oscillator.stop(); }, long_of_beep);
  }//-----------------------------------------------------------------------------------------

  fn_BuscaDatos_API() {

    // console.log('----- fn_BuscaDatosAPI------');
    let li: number = 0;

    let _limit: number = Number(this.formHowMatySentences.get('txt_how')?.value);
    let _msj: string = "";
    // let _uLevel = this.fn_uLevel();

    debugger;
    let _uLevel = this.buttonSeleccted;


    let wordsTouserItem: wordstouserModel[] = [];
    let sentenceItem: sentenceModel[] = [];
    let responseListItem: ResponseZan = { userId: "ezan", sentences: sentenceItem, level: _uLevel };


    this.openSpinner = true;



    this.uiOperGrService.getGamesAAPuzzleWords_2({
      "org": "DTL-01",
      "ulevel": _uLevel,
      "kog": "puzzlewords",
      "hms": _limit,
      "words": this.list_words_guessed,
      "grades": this.list_grades_guessed,
      "avg": 0,
      "setlevel": false,
    }).subscribe((resp: any) => {
                                  // console.log('- ---- respondio busqueda api------');
                                  // console.log(resp);


                                  //--hace el mapeo de los datos, pra emitirlos -------
                                  try { this.fn_wordsTouserItem(resp, _uLevel); }
                                  catch (e: any) {
                                            this.openSpinner = false;
                                            _msj = ' Error http://';
                                            this.fn_ShowMessage('Error', true, this.gameService.getTraslateAlert(this.selectedLang,"http"), _msj, false);
                                            return;
                                  }
                                  finally { }






                                  // console.log('----- salio del map----');

                                  this.openSpinner = false;

                                  if (this.responseListData.length > 0) {


                                    this.btn_start_visible = false;
                                    this.disabled_button = true;

                                    this.formHowMatySentences.get('txt_how')?.setValue(this.responseListData[0].sentences.length.toString());



                                    this.fn_ModControles_B_1('disable');

                                  }
                                  else { this.fn_erroAPI(); }


                                  //---- emite la informacion al apdre
                                  this.Output_list_Words_API_2.emit(this.responseListData);


                                }
      , (_error) => {
        // console.log('----- erro API  (2)----');
        // console.log(_error);
        let _msj = '';

        try { _msj = _error.error.detail.toString(); }
        catch (e: any) { _msj = ' Error http://'; }
        finally { }


        this.openSpinner = false;
        this.fn_ShowMessage('Error', true, this.gameService.getTraslateAlert(this.selectedLang,"http"), _msj, false);
        return;

      }
    );



  }//_------------------------------------------------------------------------------------------------

  fn_wordsTouserItem(_item: any, _level: string) {

    let _user: string = "";
    let wordsTouserItem: wordstouserModel[] = [];
    let sentenceItem: sentenceModel[] = [];



    if (_item.sentences.length > 0) {
      _user = _item.userId.toString();

      _item.sentences.forEach((_Sen: any) => {
        wordsTouserItem = [];

        _Sen.wordstouser.forEach((item: String) => { wordsTouserItem.push({ value: item.toString() }); });

        sentenceItem.push({
          sentence: _Sen.sentence.toString()
          , wordstouser: wordsTouserItem
          , eletoshow: _Sen.eletoshow.toString()
          , idSCat: _Sen.idSCat.toString()
          , word: _Sen.word.toString()
          , exTarget: _Sen.exTarget.toString()
          , original_sentence: _Sen.original_sentence.toString()
        });


      });

    }
    else {

      this.openSpinner = false;
      this.fn_ShowMessage('Error', true,this.gameService.getTraslateAlert(this.selectedLang,"noInformation"), "", false);
      return;
    }



    let responseListItem: ResponseZan = { userId: _user, sentences: sentenceItem, level: _level };


    this.responseListData.push(responseListItem);

    // console.log("-------  encontro los datos -- fn_wordsTouserItem()  ");
    // console.log(this.responseListData);




  }//----------------------------------------------------------------------

  fn_BuscaDatos_Local() {



    let wordstouserItem: wordstouserModel[] = [];
    wordstouserItem.push({ value: "a" }, { value: "b" }, { value: "c" });

    let sentenceItem: sentenceModel[] = [];
    sentenceItem.push({ sentence: "a", wordstouser: wordstouserItem, eletoshow: "", idSCat: "10000002", word: "", exTarget: "", original_sentence: "" })


    let responseListItem: ResponseZan = { userId: "ezan", sentences: sentenceItem, level: "A1" };



    this.responseListData.push(responseListItem);

    // console.log("-------  encontro los datos -- ");
    // console.log(this.responseListData);

    this.Output_list_Words_API_2.emit(this.responseListData);




  }//------------------------------



  fn_erroAPI() {

    // console.log('------ erro api ----');

    this.fn_ShowMessage("Error", true,this.gameService.getTraslateAlert(this.selectedLang,"noHaveWord"), "You don't have words archived!!!!", false);



  }//----------------------------------------------

  fn_ModControles_B_1(_opc: string) {


    switch (_opc) {
      case 'enable': {
        this.formHowMatySentences.get('txt_how')?.enable();

        break;
      }
      case 'disable': {
        this.formHowMatySentences.get('txt_how')?.disable();

        break;
      }
      case 'reset': {
        this.formHowMatySentences.get('txt_how')?.reset();

        break;
      }

      default: { break; }
    }




  }//------------------------------------------------------------------

  fn_Words(_Words: Array<string>): string {
    //--- Objetivo: concatena la lista de palabras en español, para presentarlas
    //--- EricZan : 11/agt/2023
    let li: number = 0;
    let _Return: string = '';
    _Words.forEach(
      function (_value) {
        li = li + 1;
        if (li <= 3) { _Return = _Return + _value.trim().toLowerCase() + ' , '; }

      });

    return _Return.trim().substring(0, _Return.trim().length - 2);
  }//---------------------------------------------------------

  fn_KeyPress() {
    this.totalWords = Number(this.formHowMatySentences.value.txt_how);

    if (this.totalWords > 50) { this.formHowMatySentences.get('txt_how')?.setValue(50); }
    if (this.totalWords < 0) { this.formHowMatySentences.get('txt_how')?.setValue(0); }


  }//--------------------------------------------------------------



}//----************************ principal   ***********************************
