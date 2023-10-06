import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{

  userId: string = '';


  constructor(
    protected fieldValidate: FieldValidateService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: LocalStorageService) { }


  ngOnInit(): void {
       this.userId = String(this.storage.load(KeyStorage.user));

       this.router.navigate(['supportoth'], { relativeTo: this.route });
  }

}
