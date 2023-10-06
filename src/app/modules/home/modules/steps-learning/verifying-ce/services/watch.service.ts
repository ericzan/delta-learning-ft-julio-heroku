import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchService {
  private watchCardSelected = new Subject<SelectModel>();
  private watchCardSelectedIsValid = new Subject<any>();
  private watchCardReset = new Subject<any>();
  constructor() { }

  setWatchCardSelected(group: string,value: boolean) {
    this.watchCardSelected.next({
      group,
      status: value
    });
  }  
  onWatchCardSelected() {
    return this.watchCardSelected;
  }
  setWatchCardSelectedIsValid(id: string, value: 'success' | 'wrong' | '') {
    this.watchCardSelectedIsValid.next({
      id,
      value: value
    });
  }
  setWatchCardReset() {
    this.watchCardReset.next(true);
  }  
  onWatchCardReset() {
    return this.watchCardReset;
  }
  onWatchCardSelectedIsValid() {
    return this.watchCardSelectedIsValid;
  }
}

export interface SelectModel{
  status: boolean;
  group: string;
}
