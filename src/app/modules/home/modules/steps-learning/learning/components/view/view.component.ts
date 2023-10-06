import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WathStepsLearningService } from '../../../services/wath-steps-learning.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { take } from 'rxjs';
import { AudioService } from '@shared/services/audio.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { WordResponseDto } from '@shared/services/dtui_oper_gr/dto/word-response-dto';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements AfterViewInit {
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  listRequest: CardModel[] = []
  listResponse: CardModel[] = []
  pkgId: string = '';
  constructor(private uiOperGrService: UiOperGrService, private wathSteps: WathStepsLearningService, private route: ActivatedRoute, private router: Router, private storage: LocalStorageService, private audioService: AudioService) {

  }
  ngAfterViewInit(): void {
    this.loading.setDisplay(true);
    this.wathSteps.setCurrentStep(1);

    this.route.parent?.parent?.paramMap.pipe(take(1)).subscribe(resp => {
      this.pkgId = String(resp.get('id'));
      this.getCards(String(resp.get('id')));
    });
  }
  audioCurrent: boolean = false;
  playAudio(link: string) {
    if (this.audioCurrent) {
      return;
    }
    this.audioService.playAudio(link);
  }
  submit() {
    const pkgId = this.pkgId;
    const updtime = new Date().toISOString();
    const level = 'lvl_10_01';
    const clicksQty = this.listRequest.length;
    const clicksCards = this.listRequest.length;
    this.uiOperGrService.saveLevel({
      cardsQty: clicksCards,
      clicksQty: clicksQty,
      level: level,
      package: pkgId,
      updtime
    }).subscribe(resp => {
      this.wathSteps.setNextStep(2);
      this.router.navigate(['../../', 2, 'verifying-vw'], {
        relativeTo: this.route,
      })
    })
  }

  // /ui_oper_lvp/level/ijcesar idPaquete 2023/06/05T22:53 lvl_null_01 0 8
  getCards(id: string) {
    let userId = this.storage.load(KeyStorage.user);
    let packageId = id;
    this.uiOperGrService.getPackage(packageId).subscribe({
      next: (data) => {
        console.log(data);
        const resp: WordResponseDto[] = data.message;
        let listData = resp.map((value) => ({
          request: value.word,
          response: (value.tranlate) ? value.tranlate?.join(', ') : '',
          id: value.position,
          pronunciation: value.pronunciation.example,
          pronunciationTarget: value.pronunciation.target,
          references: value.additional,
          audio: this.uiOperGrService.getUrlAudio({
            word: value.word,
            idWord: String(value.pronunciation.pronunciation)
          }),
        }));
        this.listRequest = listData.map(value => ({
          id: value.id + '-request',
          idExternal: value.id,
          pronunciation: value.pronunciation,
          linkAudio: value.audio,//'http://localhost:52294/quest1.mp3',
          references: value.references.filter((value) => value.position === 'source').map(
            (value) => {
              return {
                label: value.title as any,
                value: value.link as any
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
          references: value.references.filter((value) => value.position === 'target').map(
            (value) => {
              return {
                label: value.title as any,
                value: value.link as any
              }
            }
          ),
          value: value.response,
        }));
        this.loading.setDisplay(false)
      }
    })
  }
}
export interface CardModel{
  id: string,
  idExternal: number,
  pronunciation: string,
  linkAudio: string,
  references: {
    label: string,
    value: string,
  }[],
  value: string,
}