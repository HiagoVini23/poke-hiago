import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule,ReactiveFormsModule, FormControl  } from '@angular/forms';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      nickname: ['', Validators.required]
    });
  }

  signUp(){
    if (this.signUpForm.valid) {
    /*userService.signUp(
      {
        email: this.email,
        password: this.password,
        name: this.name,
        nickname: this.nickname
      })*/
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
