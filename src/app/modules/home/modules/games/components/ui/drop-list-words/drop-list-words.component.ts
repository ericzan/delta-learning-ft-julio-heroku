
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgFor } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'zan-drop-list-words-zan',
  templateUrl: './drop-list-words.component.html',
  styles: [],

})
export class DropListWordsComponent implements OnInit {



  @Input()
  public input_listWords_Ori: Array<{ Id: number, Value: string }> = [];

  @Input()
  public input_listWords_Des: Array<{ Id: number, Value: string }> = [];


  @Output()
  public Output_list_02_Data: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();



  ngOnInit(): void {
    // this.listWords_Ori.push({ Id:0, Value: "boa"  },{ Id:1, Value: "la"  },{ Id:2, Value: "eric"  },{ Id:3, Value: "zan"  },{ Id:4, Value: "remirez morales"  });
    // this.listWords_Des.push({ Id:0, Value: ""  },{ Id:1, Value: ""  },{ Id:0, Value: ""  });

  } //--------------------------------------------------------------------


  fn_CreateListWords(_sentence: string) {


    let listValues = _sentence.split("|");
    let li = 0;
    let _listWords_Ori: Array<{ Id: number, Value: string }> = [];

    listValues.forEach(function (_value) {


      _listWords_Ori.push({ Id: li, Value: _value.trim() });
      li = li + 1;

    });

    this.input_listWords_Ori = _listWords_Ori;


  }//------------------------------------------

  fn_ClickOri(_id: number) {

    let _Output_list_02_Data: Array<string> = [];

    let _listWords_Ori: Array<{ Id: number, Value: string }> = [];
    _listWords_Ori = this.input_listWords_Ori;
    this.input_listWords_Ori = [];

    let li = 0;

    _listWords_Ori.forEach((_item) => {

      if (_item.Id != _id) { this.input_listWords_Ori.push({ Id: li, Value: _item.Value }); }
      else { this.input_listWords_Des.push({ Id: this.input_listWords_Des.length, Value: _item.Value }); li--; }
      li++;

    });

    this.input_listWords_Des.forEach((_item) => { _Output_list_02_Data.push(_item.Value); });


    this.Output_list_02_Data.emit(_Output_list_02_Data);


    // console.log("----- de Ori   a Dest  -----------");
    // console.log(this.input_listWords_Ori);
    // console.log(this.input_listWords_Des);

  }//-------------------------------------------------------------------

  fn_ClickDes(_id: number) {
    let _Output_list_02_Data: Array<string> = [];

    let _listWords_Des: Array<{ Id: number, Value: string }> = [];
    _listWords_Des = this.input_listWords_Des;
    this.input_listWords_Des = [];

    let li = 0;

    _listWords_Des.forEach((_item) => {

      if (_item.Id != _id) { this.input_listWords_Des.push({ Id: li, Value: _item.Value }); }
      else { this.input_listWords_Ori.push({ Id: this.input_listWords_Ori.length, Value: _item.Value }); li--; }
      li++;

    });

    this.input_listWords_Des.forEach((_item) => { _Output_list_02_Data.push(_item.Value); });


    this.Output_list_02_Data.emit(_Output_list_02_Data);



    // console.log("----- de Dest  a Ori -----------");
    // console.log(this.input_listWords_Des);
    // console.log(this.input_listWords_Ori);


  }//-------------------------------------------------------------------


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.input_listWords_Ori, event.previousIndex, event.currentIndex);
  }//--------------------------------------------


}//****************************  proncipal ******************** */
