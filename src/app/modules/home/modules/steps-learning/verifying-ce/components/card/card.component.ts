import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WatchService } from '../../services/watch.service';
import { AudioService } from '@shared/services/audio.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() item: any;
  @Input() group: string = '';
  @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();
  selected = false;
  hide = false;
  completed = false;
  secret = true;
  isValid = '';
  constructor(private watchService: WatchService,private audioService: AudioService) {
    this.watchService.onWatchCardSelected().subscribe(resp => {
      if (resp.group !== this.group || this.completed) {
        return;
      }
      if (resp.status && !this.selected) {
        this.hide = true;
        return;
      }
      this.hide = false;
    });
    this.watchService.onWatchCardSelectedIsValid().subscribe(resp => {
      if (resp.id === this.item.id) {
        if (resp.value === '' && this.isValid === 'success') {
          this.completed = true;
        }
        if (resp.value === '') {
          this.setDeselected(this.item);
        }
        this.isValid = resp.value;
      }
    });
    this.watchService.onWatchCardReset().subscribe( resp => {
      this.reset();
    });
  }
  playAudio(link: string) {
    if (this.hide) {
      return;
    }
    this.audioService.playAudio(link);
  }
  setSelected(item: any) {
    this.playAudio(item.linkAudio);
    if (this.hide || this.selected || this.completed) {
      return;
    }
    this.selected = true;
    this.secret = false;
    this.watchService.setWatchCardSelected(this.group, this.selected);
    this.onSelected.emit(item);
  }
  setDeselected(item: any) {
    this.selected = false;
    this.secret = (this.isValid === 'success')?false: true;
    this.watchService.setWatchCardSelected(this.group, false);
  }
  reset(){
    this.selected = false;
    this.hide = false;
    this.secret = true;
    this.completed = false;
    this.isValid = '';
  }
}
