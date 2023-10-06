import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WathStepsLearningService {
  private currentStep = new Subject<number>();
  private watchCardSelectedIsValid = new Subject<any>();
  private nextStep = new Subject<number>();
  private shuffle = new Subject<boolean>();
  constructor() { }

  setCurrentStep(value: number) {
    this.currentStep.next(value);
  }  
  onCurrentStep() {
    return this.currentStep;
  }
  setShuffle(value: boolean) {
    this.shuffle.next(value);
  }  
  onShuffle() {
    return this.shuffle;
  }
  setNextStep(value: number) {
    this.nextStep.next(value);
  }  
  onNextStep() {
    return this.nextStep;
  }
  
  setWatchCardSelectedIsValid(id: string, value: 'success' | 'wrong' | '') {
    this.watchCardSelectedIsValid.next({
      id,
      value: value
    });
  }
  onWatchCardSelectedIsValid() {
    return this.watchCardSelectedIsValid;
  }
}