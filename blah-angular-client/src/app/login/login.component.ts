import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="form" (submit)="submit()">
      <label>
        Username:
        <input type="text" formControlName="username">
      </label>
      <label>
        Password:
        <input type="password" formControlName="password">
      </label>
      <button type="submit">Login</button>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    username: [],
    password: []
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.form.value);
    const { username, password } = this.form.value;

    this.auth.attemptLogin(username, password).subscribe(token => {
      localStorage.setItem('token', token);

      this.router.navigate(['/buddies']);
    });
  }

}
