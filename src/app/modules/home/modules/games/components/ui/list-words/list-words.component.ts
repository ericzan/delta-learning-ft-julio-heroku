import { Component, Input } from '@angular/core';

@Component({
  selector: 'zan-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss']
})
export class ListWordsComponent {


  @Input()
  public Input_Div: string = "";
  @Input()
  public Input_Averge: string = "";
  @Input()
  public Input_List_Words_Process: Array<{ espaniol: string, value: number, ingles: string }> = [];

fn_Resta(_list :any):number
{


  return _list[_list.length - 1].value;
}

}
