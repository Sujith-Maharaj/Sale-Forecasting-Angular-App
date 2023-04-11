import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  Email!: string;
  Password!: string;
  message !: string;

  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]),
  });

  constructor(private router:Router, private http: HttpClient) {}

  get email() {
    return this.loginform.get('email');
  }

  get password() {
    return this.loginform.get('password');
  }

  onSubmit() {
    this.http.post('http://127.0.0.1:5000/login', { email: this.Email, password: this.Password }).subscribe(
      (response:any) => {
        alert("login success..!")
        this.router.navigate(['fileupload'])
      },
      (error: any) =>{
        alert("Invalid credentials..!")
      }
    );
  }

  onclick(){
    this.router.navigate(['signup'])
  }

}
