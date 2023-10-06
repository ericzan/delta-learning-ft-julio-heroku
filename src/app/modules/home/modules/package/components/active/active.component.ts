import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { dateTimeFormat } from '@shared/services/utils';
import { MenuItem } from 'primeng/api';
import { PackageModel } from '../../models/package.model';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent  implements AfterViewInit {
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  listPackages: PackageModel[] = []
  idSubCat: string = '';
  constructor(private uiOperGrService: UiOperGrService, private route: ActivatedRoute, private router: Router) {
    
  }
  ngAfterViewInit(): void {
    this.loading.setDisplay(true);
    this.route.parent?.parent?.paramMap.subscribe( resp => {
      this.idSubCat = String(resp.get('id'));
      this.getPackages();
    })
  }
  ngOnInit(): void {
  }
  getPackages(){
    this.uiOperGrService.getListPackageOfSubCategory(this.idSubCat).subscribe( (resp: any) => {
      let data: PackageModel[] = resp.message; 
      this.listPackages = data;
      this.loading.setDisplay(false);
    })
  }
  sendArchive(packageId: string){
    this.loading.setDisplay(true);
    this.uiOperGrService.setArchivePackage(packageId).subscribe( resp => {
      this.getPackages();
    });
  }
  submit(){
    this.loading.setDisplay(true);
    let getSubCatId =  Number(this.idSubCat);
    this.uiOperGrService.createPackage({
      idScat: getSubCatId,
      package: dateTimeFormat(),
      capacity: 8
      
    }).subscribe( (resp: any) => {
      this.loading.setDisplay(false);
      this.router.navigate(['../../../../','steps',getSubCatId ,resp.packageId, 1],{ relativeTo: this.route });
    });
  }
}
