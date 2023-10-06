import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  collapseHorizontallyAnimation,
} from 'angular-animations';
import { lang } from 'moment-timezone';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    fadeInOnEnterAnimation({
      duration: 500
    }),
    fadeOutOnLeaveAnimation({
      duration: 300
    }),
    collapseHorizontallyAnimation()
  ]
})
export class MainComponent implements OnInit {
  items: MenuItem[] = [];
  displayMenuMovil = false;
  infoUser: any = {
    name: '',
    selected_lang:''
  };

  list_MenuTraslate: Array<{ Label:string,Value:string,lang:string}> = [];
  selectedLang =""
  constructor(private router: Router, private uiOperGrService: UiOperGrService) {

  }
  ngOnInit(): void {
    this.getConfig();

  }
  logaout() {
    this.router.navigateByUrl('/login');
  }
  getConfig() {
    // console.log("----getConfig()------ resp  ") ;

    this.uiOperGrService.getInfoUser().subscribe((resp: any) => {
      // console.log("----subscribe------ resp  ",resp);

      this.selectedLang  = resp.selected_lang;

      let data: {
        birth_year: string,
        capacity: number,
        contactEmail: string,
        contactId: string,
        contactName: string,
        contactPhone: string,
        country_birth: string,
        country_res: string,
        month_year: string,
        name: string,
        native_lang: string,
        selected_lang:string,
        us_ctInsert: string,
        usemail: string,
        userId: string,
      } = resp;
      this.infoUser = data;

      this.iniTralateMenu();
      this.createItemsMenu();

    });





  }
  toggleMenuMovil() {

    this.displayMenuMovil = !this.displayMenuMovil;
  }

  createItemsMenu() {
    // console.log("--------createItemsMenu-------",this.selectedLang );

    this.items = [
      {
        label: this.valueMenu('Configuration',this.selectedLang) ,
        items: [
          {
            label: this.valueMenu('UserConfiguration',this.selectedLang)  ,
            icon: 'fas fa-user',
            routerLink: './user-configuration',
            command: () => { this.toggleMenuMovil(); }
          },
          {
            label:  this.valueMenu( 'LevelEvaluation',this.selectedLang)  ,
            icon: 'fas fa-layer-group',
            routerLink: './level',
            command: () => { this.toggleMenuMovil(); }
          },
          {
            label: this.valueMenu( 'Supportoth',this.selectedLang)  ,
            icon: 'fas fa-layer-group',
            routerLink: './ask-for-supportoth',
            command: () => { this.toggleMenuMovil(); }
          }


        ]
      },
      {
        label: this.valueMenu( 'AdditionalOptions',this.selectedLang)   ,
        items: [
          {
            label: this.valueMenu( 'Games',this.selectedLang)  ,
            icon: 'fas fa-atom',
            routerLink: './games',
            command: () => { this.toggleMenuMovil(); }
          },
          {
            label: this.valueMenu( 'RecommendedLinks',this.selectedLang)    ,
            icon: 'fas fa-atom',
            routerLink: './recommended-links',
            command: () => { this.toggleMenuMovil(); }
          }
        ]
      }

    ];


  }

valueMenu(_label:string ,_lang:string ):string{



 let _Return : any;
 _Return = this.list_MenuTraslate.find(x => x.Label == _label && x.lang ==_lang)?.Value.toString();

  return _Return;

}

  iniTralateMenu (){

    this.list_MenuTraslate.push({Label:"Configuration",Value:"Configuration",lang:"en"});
    this.list_MenuTraslate.push({Label:"UserConfiguration",Value:"User Configuration",lang:"en"});
    this.list_MenuTraslate.push({Label:"LevelEvaluation",Value:"Level Evaluation",lang:"en"});
    this.list_MenuTraslate.push({Label:"Supportoth",Value:"Support",lang:"en"});
    this.list_MenuTraslate.push({Label:"AdditionalOptions",Value:"Additional Options",lang:"en"});
    this.list_MenuTraslate.push({Label:"Games",Value:"Games",lang:"en"});
    this.list_MenuTraslate.push({Label:"RecommendedLinks",Value:"Recommended Links",lang:"en"});

    this.list_MenuTraslate.push({Label:"Configuration",Value:"Configuración",lang:"es"});
    this.list_MenuTraslate.push({Label:"UserConfiguration",Value:"Configuración de usuario",lang:"es"});
    this.list_MenuTraslate.push({Label:"LevelEvaluation",Value:"Evaluación de nivel",lang:"es"});
    this.list_MenuTraslate.push({Label:"Supportoth",Value:"Soporte",lang:"es"});
    this.list_MenuTraslate.push({Label:"AdditionalOptions",Value:"Opciones adicionales",lang:"es"});
    this.list_MenuTraslate.push({Label:"Games",Value:"Juegos",lang:"es"});
    this.list_MenuTraslate.push({Label:"RecommendedLinks",Value:"Enlaces recomendados",lang:"es"});

  }

}
