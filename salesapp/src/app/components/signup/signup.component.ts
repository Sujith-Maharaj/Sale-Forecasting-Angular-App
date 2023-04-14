import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent {

  Email: string | undefined;
  Password: string | undefined;

  signupform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$')]),
  });

  constructor(private router:Router, private http: HttpClient) {}

  get email() {
    return this.signupform.get('email');
  }

  get password() {
    return this.signupform.get('password');
  }
  
  onSubmit(){
    const{email, password} = this.signupform.value;
    this.http.post('http://127.0.0.1:5000/signup', { email, password})
      .subscribe(response => {
        console.log(response)
        alert("Signedp successfully...please login to use this application")
        this.router.navigate(['login'])
      });
    }

  onclick(){
    this.router.navigate(['login'])
  }
}
