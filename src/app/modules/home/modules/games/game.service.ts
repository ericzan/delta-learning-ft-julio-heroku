import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public CLEAR_LIST$ = new BehaviorSubject<boolean>(false);



  constructor() { }

getTraslateAlert (_lang:string,_opc:string,_value?:string){

  let _return ="";




  if (_lang=="en")
  {
        switch(_opc)
        {
          case "": { break;  }
          case "isRight":  { _return = " Yes, it is right!!!!  ";  break;   }
          case "triyingWord":    { _return = "Sorry, You are trying the word --> :  " + _value;  break;   }
          case "tryAgain":    { _return = "Sorry, try again!!!!:"; break; }
          case "howManySentences":    { _return = "Inválida ==> (HOW MANY SENTENCES TO TRY) " ;  break;   }
          case "howManyWords":    { _return = " Invalid  ==>  (HOW MANY WORDS TO TRY)" ;  break;   }
          case "kindWord":    { _return = " Invalid  ==>  (Kind of word ) "; break; }
          case "goodJob":    { _return = "That is great.... Good Job!!!"; break; }
          case "http":    { _return = "Tcommunication error http:// "; break; }
          case "error":    { _return = " Error"; break; }
          case "noInformation":{_return="There is no information";break}
          case "TypeError":{_return="TypeError: Cannot read properties of undefined (reading 'map')";break}
          case "noHaveWord":    { _return = " You don't have words archived!!!!"; break; }
          default: { break; }
        }


  }
  else
  {
    switch(_opc)
    {
          case "": { break;  }
          case "isRight":  { _return = "¡¡¡¡Si, es correcto!!!!";  break;   }
          case "triyingWord":    { _return = "Lo lamento, la palabra que buscas es --> :  " + _value;  break;   }
          case "tryAgain":    { _return = "Lo lamento, intente de nuevo!!!!"; break; }
          case "howManySentences":    { _return = "Inválida ==> (CUÁNTAS ORACIONES PROBAR) " ;  break;   }
          case "howManyWords":    { _return = " Inválida ==> (CUANTAS PALABRAS PARA INTENTAR)" ;  break;   }
          case "kindWord":    { _return = " Inválida ==> (tipo de palabra)"; break; }
          case "goodJob":    { _return = "Eso es genial... ¡¡¡Buen trabajo!!!"; break; }
          case "http":    { _return = "Error de comunicación http://"; break; }
          case "error":    { _return = " Error"; break; }
          case "noInformation":{_return="No  hay información";break}
          case "TypeError":{_return="TypeError: no se pueden leer las propiedades (leyendo 'mapa')";break}
          case "noHaveWord":    { _return = " No tienes palabras Seleccionadas !!!!"; break; }
          default: { break; }
    }
  }

  return _return;


}

}// ************ principal **********
