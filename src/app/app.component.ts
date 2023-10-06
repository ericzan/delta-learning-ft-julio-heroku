import { Component } from '@angular/core';
import { Translatei18Service } from '@core/services/translatei18.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translatei18Service: Translatei18Service) {
    this.translatei18Service.initialLenguage();
  }
}
