import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class Translatei18Service {

  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService) {

  }
  initialLenguage() {

    let lenguage = this.localStorageService.load(KeyStorage.lenguage);
    console.log('lenguage', lenguage);
    if (lenguage === null || lenguage === '') {
      lenguage = 'en';
    }
    this.translate(lenguage);
  }
  translate(lang: string) {
    this.localStorageService.save(KeyStorage.lenguage, lang);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
}
