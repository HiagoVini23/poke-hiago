import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UtilsService } from '../utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isToastOpen = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService,
    private router: Router, private toastController: ToastController,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ionViewWillEnter(){
    this.loginForm.reset()
  }

  async login() {
    if (this.loginForm.valid) {
      const response = await this.authService.login({ email: this.email, password: this.password })
      if (response) {
        this.router.navigate(['/home']);
      }
      else
        this.utilsService.presentToast('Credenciais Incorretas', 'close-outline','danger')
    }
  }

  get email() {
    return this.loginForm.get('email')!.value;
  }

  get password() {
    return this.loginForm.get('password')!.value;
  }
}
