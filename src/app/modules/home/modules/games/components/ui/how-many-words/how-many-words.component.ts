import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { catchError, of } from 'rxjs';
import { GameModule } from '../../../game.module';
import { GameService } from '../../../game.service';



@Component({
  selector: 'zan-how-many-words',
  templateUrl: './how-many-words.component.html',
  styleUrls: ['./how-many-words.component.scss']
})
export class HowManyWordsComponent implements OnInit {

  @Output()
  public Output_list_Words_API = new EventEmitter<Array<{ espaniol: string, value: number, ingles: string  ,wordstouser:Array<string>,audio:string }>>();
  @Input()
  public Input_koGame! :string;

  koGame ="";


  formHowMatyWords!: FormGroup;
  btn_start_visible: boolean = true;
  totalWords: number = 0;
  public _MsjParams_Alert: Array<{ TypeMessge: string, ShowAlert: boolean, Messge: string, Comment: string }> = [];
  context: AudioContext = new AudioContext();
  oscillator: OscillatorNode = this.context.createOscillator();

  openSpinner: boolean = false;
  list_Words_API: Array<{ espaniol: string, value: number, ingles: string ,wordstouser:Array<string> ,audio:string  }> = [];
  // list_Words_View: Array<{ espaniol: string, value: number, ingles: string }> = [];
  // list_Words_process: Array<{ espaniol: string, value: number, ingles: string }> = [];
  li_total_Palabras_API: number = 0;
  selectedLang="";
  constructor(private fb: FormBuilder,
    private uiOperGrService: UiOperGrService,
    private gameService :GameService
    ) { }


  ngOnInit(): void {

    this.koGame = this.Input_koGame ;

    this.formHowMatyWords = this.fb.group({
      txt_how: new FormControl({ value: '0', disabled: false }),
      chk_adj: new FormControl({ value: true, disabled: false }),
      chk_noun: new FormControl({ value: true, disabled: false }),
      chk_adv: new FormControl({ value: true, disabled: false }),
      chk_verb: new FormControl({ value: true, disabled: false }),
      chk_PastTense: new FormControl({ value: false, disabled: false }),
    })

    this.getConfig();

    this.fn_ShowMessage("", false, "", "", false);

  } //---------------------------------------------------------------

  getConfig() {
    this.uiOperGrService.getInfoUser().subscribe((resp: any) => {

      // console.log("----- response API ------------",resp);
      this.selectedLang  = resp.selected_lang;

     // console.log("pantlla --- ",screen.width)
    });
  } //------------------------------------------------

  fn_chk_verb_cambia() {



    if (this.formHowMatyWords.value.chk_verb) { this.formHowMatyWords.get('chk_PastTense')?.reset(); }
  }//-----------------------------------

  fn_chk_PastTense_cambia() {


    if (this.formHowMatyWords.value.chk_PastTense) { this.formHowMatyWords.get('chk_verb')?.reset(); }
  }


  fn_Start_click() {


    this.totalWords = Number(this.formHowMatyWords.value.txt_how);

    //------- valida total de palabras
    if (this.totalWords === 0) {

      this.fn_ShowMessage("Alert", true, this.gameService.getTraslateAlert(this.selectedLang,"howManyWords")  , "", false);
      return;
    }


    //--- valida algun tipo de palabra seleccionada -----

    if (!this.formHowMatyWords.value.chk_adj &&
      !this.formHowMatyWords.value.chk_noun &&
      !this.formHowMatyWords.value.chk_adv &&
      !this.formHowMatyWords.value.chk_verb &&
      !this.formHowMatyWords.value.chk_PastTense) {

      this.fn_ShowMessage("Alert", true, this.gameService.getTraslateAlert(this.selectedLang,"kindWord")  , "", false);
      return;
    }



    this.fn_BuscaDatos_API(); //--- busca los datos de la API
    //  this.fn_BuscaDatos_Mnual(); //--- busca los datos manualmente

  }//------------------------------------------------------------------

  fn_BuscaDatos_API() {

    // console.log("----- fn_BuscaDatosAPI------");
    let li: number = 0;

    let _limit: number = Number(this.formHowMatyWords.get('txt_how')?.value);

    let _adj: boolean = this.formHowMatyWords.get('chk_adj')?.value;
    let _verb: boolean = this.formHowMatyWords.get('chk_verb')?.value;
    let _pt_verb: boolean = this.formHowMatyWords.get('chk_PastTense')?.value;
    let _noun: boolean = this.formHowMatyWords.get('chk_noun')?.value;
    let _adv: boolean = this.formHowMatyWords.get('chk_adv')?.value;

    _adj = _adj === null ? false : _adj;
    _verb = _verb === null ? false : _verb;
    _pt_verb = _pt_verb === null ? false : _pt_verb;
    _noun = _noun === null ? false : _noun;
    _adv = _adv === null ? false : _adv;



    this.openSpinner = true;



    this.uiOperGrService.getGamesAA({
          orgId: "DTL-01",
          limit: _limit,
          subcat: 0,
          kogame:this.koGame,
          adj: _adj,
          verb: _verb === null ? false : _verb,
          pt_verb: _pt_verb === null ? false : _pt_verb,
          noun: _noun,
          adv: _adv,
          prep: false
    }).subscribe((resp: any) => {
            // console.log("- ---- respondio busqueda api----getGamesAA--");
            // console.log(resp);

            this.list_Words_API = resp.map((value: any) => ({
              espaniol: this.fn_Words(value.words),
              value: li += 1,
              ingles: value.worde.trim(),
              wordstouser:value.wordstouser,
              audio:this.uiOperGrService.getUrlAudio_2({  word: value.worde.trim(),  idWord: String(value.soundId)  }),



      })), catchError(e => {
          // console.log('----- erro API  catchError ----');
          this.openSpinner = false;
          return of(null);
        });


        console.log("----list_Words_API---",  this.list_Words_API)



      // console.log('----- salio del map----');

      this.openSpinner = false;

      if (this.list_Words_API.length > 0) {
        this.btn_start_visible = false;

        this.li_total_Palabras_API = li;
        if (this.li_total_Palabras_API !== this.totalWords) {
          this.totalWords = this.li_total_Palabras_API;
          this.formHowMatyWords.get('txt_how')?.setValue(this.li_total_Palabras_API.toString());
        }

        this.fn_ModControles_B_1("disable");


      }
      else { this.fn_erroAPI(); }


      //---- emite la informacion al apdre
      this.Output_list_Words_API.emit(this.list_Words_API);


    }
      , (_error) => {
        // console.log('----- erro API  (2)----');
        // console.log(_error);
        let _msj = "";

        try { _msj = _error.error.detail.toString(); }
        catch (e: any) { _msj = " Error http://"; }
        finally { }


        this.openSpinner = false;
        this.fn_ShowMessage("Error", true,this.gameService.getTraslateAlert(this.selectedLang,"http") , _msj, false);
        return;

      }
    );



  }//_------------------------------------------------------------------------------------------------




  fn_Words(_Words: Array<string>): string {
    //--- Objetivo: concatena la lista de palabras en español, para presentarlas
    //--- EricZan : 11/agt/2023
    let li: number = 0;
    let _Return: string = "";
    _Words.forEach(
      function (_value) {
        li = li + 1;
        if (li <= 3) { _Return = _Return + _value.trim().toLowerCase() + " , "; }

      });

    return _Return.trim().substring(0, _Return.trim().length - 2);
  }//-----------------------------------------------------------------------

  fn_ShowMessage(_TypeMessge: string, _ShowAlert: boolean, _Messge: string, _Comment: string, _Sound: boolean) {

    if (_Sound) {
      if (_TypeMessge === "Error" || _TypeMessge === "Alert") { this.doing_beep(400, 350); }
      else { this.doing_beep(400, 800); }

    }


    this._MsjParams_Alert = [{ TypeMessge: _TypeMessge, ShowAlert: _ShowAlert, Messge: _Messge, Comment: _Comment }];
  }//------------------------------------------------------------



  doing_beep(long_of_beep: number, freq: number) {

    var context = new AudioContext();
    var oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = freq;
    oscillator.connect(context.destination);
    oscillator.start();

    setTimeout(function () { oscillator.stop(); }, long_of_beep);
  }//-----------------------------------------------------------------------------------------


  fn_erroAPI() {

    // console.log('------ erro api ----');

    this.fn_ShowMessage("Error", true, this.gameService.getTraslateAlert(this.selectedLang,"noHaveWord"),""  , false);
    return;


  }//----------------------------------------------

  fn_ModControles_B_1(_opc: string) {


    switch (_opc) {
      case "enable": {
        this.formHowMatyWords.get('txt_how')?.enable();
        this.formHowMatyWords.get('chk_adj')?.enable();
        this.formHowMatyWords.get('chk_noun')?.enable();
        this.formHowMatyWords.get('chk_adv')?.enable();
        this.formHowMatyWords.get('chk_verb')?.enable();
        this.formHowMatyWords.get('chk_PastTense')?.enable();
        break;
      }
      case "disable": {
        this.formHowMatyWords.get('txt_how')?.disable();
        this.formHowMatyWords.get('chk_adj')?.disable();
        this.formHowMatyWords.get('chk_noun')?.disable();
        this.formHowMatyWords.get('chk_adv')?.disable();
        this.formHowMatyWords.get('chk_verb')?.disable();
        this.formHowMatyWords.get('chk_PastTense')?.disable();
        break;
      }
      case "reset": {
        this.formHowMatyWords.get('txt_how')?.reset();
        this.formHowMatyWords.get('chk_adj')?.reset();
        this.formHowMatyWords.get('chk_noun')?.reset();
        this.formHowMatyWords.get('chk_adv')?.reset();
        this.formHowMatyWords.get('chk_verb')?.reset();
        this.formHowMatyWords.get('chk_PastTense')?.reset();
        break;
      }

      default: { break; }
    }




  }//------------------------------------------------------------------

  fn_KeyPress() {
    this.totalWords = Number(this.formHowMatyWords.value.txt_how);

    if (this.totalWords > 50) { this.formHowMatyWords.get('txt_how')?.setValue(50); }
    if (this.totalWords < 0) { this.formHowMatyWords.get('txt_how')?.setValue(0); }


  }



}//------------------------------ principal ---------------------
