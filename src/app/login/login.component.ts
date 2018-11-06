import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';


interface LoginCredentials {
  email: String;
  password: String;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  credentials: LoginCredentials = {email: '', password: ''};

  submitted = false;
  unauthorized;

  onSubmit() {
    this.submitted = true;
    this.auth.login(this.credentials)
    .then(() => this.router.navigate(['dashboard']))
    .catch(error => {
      console.log(error);
      this.unauthorized = true;
    });
  }

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
}
