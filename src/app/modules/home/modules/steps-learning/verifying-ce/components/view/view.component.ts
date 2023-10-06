import { Component, OnInit, ViewChild } from '@angular/core';
import { WatchService } from '../../services/watch.service';
import { HttpClient } from '@angular/common/http';
import { WathStepsLearningService } from '../../../services/wath-steps-learning.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { environment } from 'src/environments/environment';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { take } from 'rxjs';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  gridMedium = true;
  max_success = 0;
  count_success = 0; //test // production 0
  max_errors = 0;
  count_errors = 0;
  _display_dialog_success = false;
  _display_dialog_warning = false;
  listRequest: CardModel[] = [];
  listResponse: CardModel[] = [];
  _isSelectedRequest!: CardModel;
  _isSelectedResponse!: CardModel;
  pkgId: string = '';
  constructor(private watchService: WatchService, private uiOperGrService: UiOperGrService, private wathSteps: WathStepsLearningService,private router: Router, private route: ActivatedRoute, private storage: LocalStorageService) {
  }
  setRandomResponse() {
    this.listResponse = this.listResponse.sort(() => Math.random() - 0.6);
    this.listRequest = this.listRequest.sort(() => Math.random() - 0.6);
  }
  ngOnInit(): void {
    this.wathSteps.setCurrentStep(4);
    this.route.parent?.parent?.paramMap.pipe(take(1)).subscribe(resp => {
      //console.log('params', String(resp.get('id')));
      this.pkgId = String(resp.get('id'));
      this.getCards(String(resp.get('id')));
    });
  }
  playAudio(link: string) {
    const audio = new Audio();
    audio.src = link;
    audio.load();
    audio.play();
  }
  clickNext(){
    this.wathSteps.setNextStep(5);
    this.router.navigate(['../','validating'],{
      relativeTo: this.route
    });
  }
  clickSend() {
    const pkgId = this.pkgId;
    const updtime = new Date().toISOString();
    const level = 'lvl_40_01';
    const clicksQty = this.listRequest.length;
    const clicksCards = this.listRequest.length;
    this.uiOperGrService.saveLevel({
      cardsQty: clicksCards,
      clicksQty: clicksQty,
      level: level,
      package: pkgId,
      updtime
    }).subscribe(resp => {
      setTimeout(() => {
        this._display_dialog_success = true;
      }, 500);
    }, error => {
      console.log('error controla no se envio registro ce', error);
    })
  }
  clickRetry(){
    this.wathSteps.setCurrentStep(4);
    this.count_success = 0;
    this.count_errors = 0;
    this._display_dialog_success = false;
    this._display_dialog_warning = false;
    this.watchService.setWatchCardReset();
  }
  submit() {

  }
  getCards(id: string) {
    let packageId = id;
    this.uiOperGrService.getPackage(packageId).subscribe({
      next: (data: any) => {
        const resp: any[] = data.message;
        this.max_success = resp.length;
        this.max_errors = parseInt(String(resp.length));
        console.log(data.message);
        let listData = resp.map((value: any) => ({
          request: value.word,
          response: (value.tranlate) ? value.tranlate?.join(', '): '',
          id: value.position,
          pronunciation: value.pronunciation.example,
          pronunciationTarget: value.pronunciation.target,
          references: value.additional,
          audio:  this.uiOperGrService.getUrlAudio({
            word: value.word,
            idWord: value.pronunciation.pronunciation
          }),
        }));
        this.gridMedium = (listData.length > 16) ? true : false;
        console.log(listData);
        this.listRequest = listData.map(value => ({
          id: value.id + '-request',
          idExternal: value.id,
          pronunciation: value.pronunciation,
          linkAudio: value.audio,//'http://localhost:52294/quest1.mp3',
          references: value.references.filter((value: any) => value.position === 'source').map(
            (value: any) =>{
              return {
                label: value.title,
                value: value.link
              }
            }
          ),
          value: value.request,
        }));
        this.listResponse = listData.map(value => ({
          id: value.id + '-response',
          idExternal: value.id,
          pronunciation: value.pronunciationTarget,
          linkAudio: value.audio, //'http://localhost:52294/response1.mp3',
          references: value.references.filter((value: any) => value.position === 'target').map(
            (value: any) =>{
              return {
                label: value.title,
                value: value.link
              }
            }
          ),
          value: value.response,
        }));
        this.setRandomResponse();
      }
    })
  }
  selectedRequest(item: CardModel) {
    this._isSelectedRequest = item;
    this.validateSelectedRequestAndResponse();
  }
  selectedResponse(item: CardModel) {
    this._isSelectedResponse = item;
    this.validateSelectedRequestAndResponse();
  }
  validateSelectedRequestAndResponse() {
    if (this._isSelectedResponse && this._isSelectedRequest && this._isSelectedResponse.id !== undefined && this._isSelectedRequest.id !== undefined) {
      let isValid: "" | "success" | "wrong" = '';
      console.log(this._isSelectedResponse.id, this._isSelectedRequest.id);
      isValid = (this._isSelectedResponse.idExternal === this._isSelectedRequest.idExternal) ? 'success' : 'wrong';
      this.watchService.setWatchCardSelectedIsValid(this._isSelectedRequest.id, isValid);
      this.watchService.setWatchCardSelectedIsValid(this._isSelectedResponse.id, isValid);
      if (isValid === "success") {
        this.count_success++;
      } else {
        this.count_errors++;
      }
      if (this.count_success >= this.max_success) {
        this.clickSend();
      }
      setTimeout(() => {
        this.watchService.setWatchCardSelectedIsValid(this._isSelectedRequest.id, '');
        this.watchService.setWatchCardSelectedIsValid(this._isSelectedResponse.id, '');
        this._isSelectedRequest = {} as CardModel;
        this._isSelectedResponse = {} as CardModel;
      }, 1000);
    }
  }
}
export interface CardDto {
  request: string,
  response: string,
  id: string
}
export interface CardModel {
  id: string,
  idExternal: string,
  value: string,
  linkAudio: string,
  references: {
    label: string,
    value: string
  }[]
}