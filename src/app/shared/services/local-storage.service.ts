import { Injectable } from '@angular/core';
import { KeyStorage } from './key-storage.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  save(key: KeyStorage, value: any) {
    return localStorage.setItem(key, value);
  }

  load(key: KeyStorage) {
    return String(localStorage.getItem(key));
  }
}
