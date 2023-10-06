import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { dateTimeFormat } from '@shared/services/utils';
import { MenuItem } from 'primeng/api';
import { PackageModel } from '../../models/package.model';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements AfterViewInit {
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  listPackages: PackageModel[] = []
  idSubCat: string = '';
  rows = 0;
  totalRecords = 0;
  constructor(private uiOperGrService: UiOperGrService, private route: ActivatedRoute, private router: Router) {
    
  }
  ngAfterViewInit(): void {
    this.loading.setDisplay(true);
    this.route.parent?.parent?.paramMap.subscribe( resp => {
      this.idSubCat = String(resp.get('id'));
      this.getPackages();
    })
  }
  getPackages(page = 1, show = 10){
    this.uiOperGrService.getListPackageOfSubCategoryHistory(this.idSubCat,page, show).subscribe( (resp: any) => {
      let data: PackageModel[] = resp.data;
      console.log(resp); 
      this.rows = data.length;
      this.totalRecords = resp.totrecs;
      this.listPackages = data;
      this.loading.setDisplay(false);
    })
  }
  onPageChange(event: any){
    console.log(event);
    this.getPackages(event.page  + 1, event.rows);
  }
}
