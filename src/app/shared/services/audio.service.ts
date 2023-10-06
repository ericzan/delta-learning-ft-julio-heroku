import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  audioCurrent: boolean = false;

  constructor() { }
  async playAudio(link: string) {
    if (this.audioCurrent) {
      return;
    }
    this.audioCurrent = true;
    try {
    const audio = new Audio();
    audio.src = link;
    audio.load();
    await audio.play();
    audio.addEventListener('ended', () => {
      this.audioCurrent = false;
    });
    } catch (error) {
      this.audioCurrent = false;
    }
  }
}
