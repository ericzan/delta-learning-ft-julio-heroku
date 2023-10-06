import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements AfterViewInit {
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  listCategories: {
    id: string,
    label: string,
    listSubCategories: any[],
  }[] = []
  constructor(private uiOperGrService: UiOperGrService){

  }
  ngAfterViewInit(): void {
    this.loading.setDisplay(true);
    this.getDashboard();
  }
  submit(){

  }
  getDashboard(){
    this.uiOperGrService.getDashboard().subscribe( (resp: any) => {
      let data: any[] = resp.message;
      let mapCategories = new Map<string, any>();
      data.forEach( row => {
        mapCategories.set(row.idCat, {
          label: row.CatName,
          id: row.idCat,
          listSubCategories: []
        });
      });
      const getCategories = Array.from(mapCategories.values());
      this.listCategories = getCategories;
      for(const subCategory of data){
        for(const category of  this.listCategories){
          if(subCategory.idCat === category.id){
            category.listSubCategories.push(subCategory);
            break;
          }
        }
      }
      this.loading.setDisplay(false);
    })
  }
}
