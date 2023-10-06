import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'zan-button-select',
  templateUrl: './button-select.component.html',
  styles: [
  ]
})
export class ButtonSelectComponent implements OnInit {


  @Input()
  public input_listOpctionsButton: string = "";

  @Input()
  public input_disabled: boolean = false;

  @Output()
  public Output_ValueSelectedButton: EventEmitter<string> = new EventEmitter<string>();


  listValuesOptions: Array<{ Id: number, Value: string, Visible: boolean }> = [];

  btnSelecciono_1 = true



  ngOnInit(): void {
    this.fn_CreateListOptions();
  }//--------------------------------------------------------------

  fn_CreateListOptions() {

    let listValues = this.input_listOpctionsButton.split("|");
    let li = 0;
    let _listValuesOptions: Array<{ Id: number, Value: string, Visible: boolean }> = [];

    listValues.forEach(function (_value) {
      li = li + 1;
      _listValuesOptions.push({ Id: li, Value: _value.trim(), Visible: false });
    });

    this.listValuesOptions = _listValuesOptions;


  }//------------------------------------------

  fn_ChangeColor(item: number) {

    // console.log(item);

    let selectedValue = "";

    for (let li = 0; li < this.listValuesOptions.length; li++) { this.listValuesOptions[li].Visible = false; }

    for (let li = 0; li < this.listValuesOptions.length; li++) {
      if (this.listValuesOptions[li].Id === item) {
        this.listValuesOptions[li].Visible = true;
        selectedValue = this.listValuesOptions[li].Value;
      }
    }


    //-------- emite el valor seleccionado --------
    this.Output_ValueSelectedButton.emit(selectedValue);



  }//------------------------------

}//-******************* pricncipal *******************************************
