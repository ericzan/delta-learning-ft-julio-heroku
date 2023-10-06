import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  public STOP$ = new BehaviorSubject<boolean>(false);



  constructor() { }
}
