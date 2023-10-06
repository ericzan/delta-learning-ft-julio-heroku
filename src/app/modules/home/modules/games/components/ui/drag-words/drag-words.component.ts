import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GameService } from '../../../game.service';

@Component({
  selector: 'zan-drag-words',
  templateUrl: './drag-words.component.html',
  styles: [
  ]
})
export class DragWordsComponent implements OnInit {

  @Input()
  public Input_Datalist: string[] = [];

  @Input()
  public Input_placeholder:string = "";

  @Output()
  public Output_DataList = new EventEmitter<Array<string>>();

  showIndication=true;
  list_DataOutput: string[] = [];
  WORDS="WORDS"
  SENTENCES="SENTENCES"

  constructor(  private gameService:GameService){  }

   ngOnInit(): void
   {
    this.list_DataOutput=[];

      this.gameService.CLEAR_LIST$.subscribe(_clear =>{
        if (_clear) {

          this.next();
          this.gameService.CLEAR_LIST$.next(false);
        }

      } );

  }

  public next(): void
  {
   this.list_DataOutput=[];
 }



  drop($event: CdkDragDrop<string[]>)
  {


    if ($event.previousContainer == $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    }
    else {
      transferArrayItem($event.previousContainer.data, $event.container.data, $event.previousIndex, $event.currentIndex);
    }


    // console.log("---Output_DataList----",this.list_DataOutput);

    if (this.list_DataOutput.length > 0) { this.showIndication = false; }
    else { this.showIndication = true; }

    this.Output_DataList.emit(this.list_DataOutput);
  }//------------------------drop-------------------------------------------

onClickButton_01 (_index:number,_item:string){


  // console.log("---boton -01",_index, _item);
  this.list_DataOutput.push(_item);
  this.Input_Datalist.splice(_index,1);

  // console.log("---Output_DataList----",this.list_DataOutput);

  if (this.list_DataOutput.length > 0) { this.showIndication = false; }
  else { this.showIndication = true; }

  this.Output_DataList.emit(this.list_DataOutput);

}//----------------------------
onClickButton_02 (_index:any,_item:string){
  // console.log("---boton -02",_index, _item);


  this.Input_Datalist.push(_item);
  this.list_DataOutput.splice(_index,1);

  // console.log("---Output_DataList----",this.list_DataOutput);

  if (this.list_DataOutput.length > 0) { this.showIndication = false; }
  else { this.showIndication = true; }

  this.Output_DataList.emit(this.list_DataOutput);

  }//----------------------------


}
