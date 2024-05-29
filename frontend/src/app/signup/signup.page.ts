import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UtilsService } from '../utils/utils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, 
    private utilsService: UtilsService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      nickname: ['', Validators.required]
    });
  }

  async signUp() {
    if (this.signUpForm.valid) {
      const response = await this.userService.createUser(
        {
          email: this.email.toLowerCase(),
          password: this.password,
          name: this.name,
          nickname: this.nickname
        })
      if (response.ok){
        this.utilsService.presentToast('Cadastrado com sucesso!', 'checkmark-outline', 'success')
        this.router.navigate(['/login']);
      }
      else if(response.status == 400){
        this.utilsService.presentToast('Email já está cadastrado!', 'close-outline', 'danger')
      }
    }
  }

  get email() {
    return this.signUpForm.get('email')!.value;
  }

  get password() {
    return this.signUpForm.get('password')!.value;
  }

  get name() {
    return this.signUpForm.get('name')!.value;
  }

  get nickname() {
    return this.signUpForm.get('nickname')!.value;
  }
}
