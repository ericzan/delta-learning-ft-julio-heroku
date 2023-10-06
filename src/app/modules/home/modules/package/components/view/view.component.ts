import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { PackageModel } from '../../models/package.model';
import { HttpService } from '@core/services/http.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { dateTimeFormat } from '@shared/services/utils';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  listPackages: PackageModel[] = []
  idSubCat: string = '';
  category = '';
  subCategory = '';
  items: MenuItem[] = [];
  constructor(
    private uiOperGrService: UiOperGrService, 
    private route: ActivatedRoute, 
    private router: Router,
    private translate: TranslateService) {
    
  }
  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe( resp => {
      this.idSubCat = String(resp.get('id'));
      this.getPackages();
    });
    
    this.items = [
      {
        label: this.translate.instant('packages.tabs.actives'),
        icon: 'far fa-folder-open',
        routerLink: './assets'
      },
      {
        label: this.translate.instant('packages.tabs.archived'),
        icon: 'fas fa-archive',
        routerLink: './archive'
      }
    ];
  }
  getPackages(){
    this.uiOperGrService.getSubCategory(this.idSubCat).subscribe( (resp: any) => {
      this.category = resp.CatName;
      this.subCategory = resp.scatname;
    })
  }
  
  submit(){
    let getSubCatId =  Number(this.idSubCat);
    this.uiOperGrService.createPackage({
      idScat: getSubCatId,
      package: dateTimeFormat(),
      capacity: 8
      
    }).subscribe( (resp: any) => {
      this.router.navigate(['../../','steps',getSubCatId ,resp.packageId, 1],{ relativeTo: this.route });
    });
  }
}
