import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldValidateService } from '@core/services/field-validate.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { KeyStorage } from '@shared/services/key-storage.enum';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements AfterViewInit {
  displayDialog = false;
  structureForm!: FormGroup;
  messageError: string = '';
  @ViewChild(LoadingComponent) loading!: LoadingComponent;
  constructor(private route: Router, private fb: FormBuilder, protected fieldValidate: FieldValidateService, private http: HttpClient, private storageService: LocalStorageService) {
    this.structureForm = this.fb.group({
      username: [, [Validators.required]],
      email: [, [Validators.required]]
    });
  }
  ngAfterViewInit(): void {
  }
  submit() {
    if (this.structureForm.invalid) {
      this.structureForm.markAllAsTouched();
      return;
    }
    this.loading.setDisplay(true);
    this.messageError = '';
    const userName = this.structureForm.value.username;
    const email = this.structureForm.value.email;
    this.http.post(`${environment.apiUrl}/dt/auth/reset_pass_notification/`, {
      userId: userName,
      user_email: email
    }).subscribe((resp: any) => {
      this.loading.setDisplay(false);
      this.displayDialog = true;
    }, (error) => {
      this.loading.setDisplay(false);
      if (error.status === 401) {
        setTimeout(() => {
          this.messageError = 'Usuario o correo no encontrados';
          this.loading.setDisplay(false);
        }, 700)
        return;
      }
    });
  }
}
