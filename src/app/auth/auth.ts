import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthPage {
  constructor(public service: Service, public cookies: CookieService, public router: Router) {}

  loginSMS = signal<string>('');
  registerSMS = signal<string>('');

  registerInfo: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('+995', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  loginInfo: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  register() {
    this.service.registerLogic(this.registerInfo.value).subscribe({
      next: () => {
        this.registerSMS.set('Registration successful! You can now log in.');
        this.registerInfo.reset({ phone: '+995' });
      },
      error: (err: any) => {
        this.registerSMS.set(err?.error?.message || 'Registration failed.');
      },
    });
  }

  login() {
    this.service.loginLogic(this.loginInfo.value).subscribe({
      next: (data: any) => {
        this.cookies.set('user', data.access_token);
        this.loginSMS.set('Login successful!');
        setTimeout(() => this.router.navigate(['/']), 800);
      },
      error: (errData: any) => {
        this.loginSMS.set(errData?.error?.errorKeys?.[0] || 'Login failed.');
        setTimeout(() => this.loginSMS.set(''), 3000);
      },
    });
  }
}
