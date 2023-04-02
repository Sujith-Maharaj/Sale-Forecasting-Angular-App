import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;


  constructor(private http: HttpClient){ }


  onSubmit(){
    this.http.post('/api/login',{username: this.username, password: this.password})
    .subscribe(response =>{
        if(response == 'success' ){
          console.log("login success");
        }
        else{
          console.log("login failed");
        }
    })
  }
}
