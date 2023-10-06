import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WatchServiceVw } from '../../verifying-vw/services/watch.service';
import { WathStepsLearningService } from '../../services/wath-steps-learning.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { HttpService } from '@core/services/http.service';
import { UiOperGrService } from '@shared/services/dtui_oper_gr/ui-oper-gr.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  flag_display_success = false;
  flag_display_shuffle = false;
  total_success = 0;
  total_errors = 0;
  listOptions: any[] =[];
  enabledStep = 1;
  constructor(
    private watchService: WatchServiceVw, 
    private wathSteps: WathStepsLearningService, 
    private df: ChangeDetectorRef, 
    private router: Router, 
    private uiOperGrService: UiOperGrService, 
    private route: ActivatedRoute,
    private translate: TranslateService) {

  }
  ngOnInit(): void {
    this.listOptions = [
      {
        label: '1',
        description: this.translate.instant('section_steps.steps.learning'),
        routerLink: ['../', 1, 'learning'],
        disabled: true,
      },
      {
        label: '2',
        description: this.translate.instant('section_steps.steps.verifying_vw'),
        routerLink: ['../', 2, 'verifying-vw'],
        disabled: true,
      },
      {
        label: '3',
        description: this.translate.instant('section_steps.steps.verifying_ls'),
        routerLink: ['../', 3, 'verifying-ls'],
        disabled: true,
      },
      {
        label: '4',
        description:  this.translate.instant('section_steps.steps.verifying_ce'),
        routerLink: ['../', 4, 'verifying-ce'],
        disabled: true,
      },
      {
        label: '5',
        description:  this.translate.instant('section_steps.steps.validating'),
        routerLink: ['../', 5, 'validating'],
        disabled: true,
      }
    ]
    this.wathSteps.onWatchCardSelectedIsValid().subscribe(resp => {
      if (resp.value === 'success') {
        this.total_success++;
      }
      if (resp.value === 'wrong') {
        this.total_errors++;
      }
    });
    this.wathSteps.onCurrentStep().subscribe(resp => {

      this.flag_display_success = false;
      this.flag_display_shuffle = false;
      this.total_errors = 0;
      this.total_success = 0;
      switch (resp) {
        case 1:
          break;
        case 2:
        case 3:
          this.flag_display_success = true;
          this.flag_display_shuffle = true;
          break;
        default:
      }
      this.df.detectChanges();
    });
    this.wathSteps.onNextStep().subscribe(resp => {
      if (this.enabledStep < resp) {
        console.log(resp);
        this.enabledStep++;
        this.enabled(this.enabledStep);
      }
    });
    this.route.paramMap.subscribe(resp => {
      this.getPackageCurrent(String(resp.get('id')), Number(resp.get('position')));
    });
  }
  getPackageCurrent(id: string, position: number) {
    let packageId = id;
    this.uiOperGrService.getSinglePackage(packageId).subscribe((data: any) => {
      const response = data.message[0]
      console.log('getPackageCurrent', response);
      if (response.maxlevel === null || response.maxlevel === 'lvl_01_01' || response.maxlevel === 'null') {
        this.enabledStep = 1;
        this.enabled(this.enabledStep);
        this.router.navigate(['../',1, 'learning'], {
          relativeTo: this.route
        });
        return;
      }
      switch (response.maxlevel) {
        case 'lvl_10_01':
          this.enabledStep = 2;
          this.enabled(this.enabledStep);
          if (position > this.enabledStep) {
            this.router.navigate(['../', 2, 'verifying-vw'], {
              relativeTo: this.route
            });
          }
          break;
        case 'lvl_20_01':
          this.enabledStep = 3;
          this.enabled(this.enabledStep);
          if (position > this.enabledStep) {
            this.router.navigate(['../', 3, 'verifying-ls'], {
              relativeTo: this.route
            });
          }
          break;
        case 'lvl_30_01':
          this.enabledStep = 4;
          this.enabled(this.enabledStep);
          if (position > this.enabledStep) {
            this.router.navigate(['../',4, 'verifying-ce'], {
              relativeTo: this.route
            });
          }
          break;
        case 'lvl_40_01':
          this.enabledStep = 5;
          this.enabled(this.enabledStep);
          if (position > this.enabledStep) {
            this.router.navigate(['../',5, 'validating'], {
              relativeTo: this.route
            });
          }
          break;
        case 'lvl_50_01':
          this.enabledStep = 5;
          this.enabled(this.enabledStep);
          break;
      }
    });
  }
  enabled(n: number) {
    for (let i = 0; i < n; i++) {
      this.listOptions[i].disabled = false;
    }
  }
  changeShuffle() {
    this.wathSteps.setShuffle(true);
    window.location.reload();
  }
  level = {
    lvl_10_01: 1,
    lvl_20_01: 2,
    lvl_30_01: 3,
    lvl_40_01: 4,
    lvl_50_01: 5
  }
}
