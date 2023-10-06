import { Component, OnInit } from '@angular/core';
import { WatchService } from '../../services/watch.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { environment } from 'src/environments/environment';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { take } from 'rxjs';
import { WathStepsLearningService } from '../../../services/wath-steps-learning.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  max_success = 8;
  count_success = 0; //test // production 0
  max_errors = 0;
  count_errors = 0;
  listRequest: CardModel[] = [];
  listResponse: CardModel[] = [];
  _display_dialog_success = false;
  _display_dialog_warning = false;
  _isSelectedRequest!: CardModel;
  _isSelectedResponse!: CardModel;
  gridMedium = false;
  pkgId: any;
  subCatId: string = '';
  constructor(private watchService: WatchService, private uiOperGrService: UiOperGrService, private storage: LocalStorageService, private route: ActivatedRoute, private router: Router, private wathSteps: WathStepsLearningService) {
  }
  setRandomResponse() {
    this.listResponse = this.listResponse.sort(() => Math.random() - 0.6);
    this.listRequest = this.listRequest.sort(() => Math.random() - 0.6);
  }
  ngOnInit(): void {
    this.route.parent?.parent?.parent?.paramMap.pipe(take(1)).subscribe(resp => {
      console.log('params subcat', String(resp.get('idSubCat')));
      this.subCatId = String(resp.get('idSubCat'));
      this.route.parent?.parent?.paramMap.pipe(take(1)).subscribe(resp => {
        console.log('params', String(resp.get('id')));
        this.pkgId = String(resp.get('id'))
        this.getCards(this.pkgId, Number(this.subCatId));
      });
    });
  }
  playAudio(link: string) {
    const audio = new Audio();
    audio.src = link;
    audio.load();
    audio.play();
  }
  submit() {

  }
  getCards(id: string, idSubCat: number) {
    let userId = this.storage.load(KeyStorage.user);
    let packageId = id;
    this.uiOperGrService.getPackageStep4({
      capacity: 16,
      idScat: idSubCat,
      package: packageId,
    }).subscribe({
      next: (data: any) => {
        const resp: any[] = data.message;
        console.log(data.message);
        let listData = resp.map((value: any) => ({
          request: value.word,
          response: (value.tranlate) ? value.tranlate?.join(', '): '',
          id: value.position,
          pronunciation: value.pronunciation.example,
          references: value.additional,
          audio:  this.uiOperGrService.getUrlAudio({
            word: value.word,
            idWord: value.pronunciation.pronunciation
          }),
        }));
        console.log(listData);
        this.gridMedium = (listData.length > 16) ? true : false;
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
          pronunciation: value.pronunciation,
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
  clickNext() {
    this.router.navigate(['../', 'ls-ls'], {
      relativeTo: this.route
    });
  }
  clickRetry() {
    
    this.wathSteps.setCurrentStep(3);
    this.count_success = 0;
    this.count_errors = 0;
    this._display_dialog_success = false;
    this.watchService.setWatchCardReset();
  }
  selectedRequest(item: CardModel) {
    this._isSelectedRequest = item;
    this.validateSelectedRequestAndResponse();
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
    }).subscribe(data => {
      const resp = data.message[0];
      if (!resp.status) {
        setTimeout(() => {
          this._display_dialog_warning = true;
        }, 500);
      } else {
        setTimeout(() => {
          this._display_dialog_success = true;
        }, 500);
      }
    })
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