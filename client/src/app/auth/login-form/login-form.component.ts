import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  textMessage!: string;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (data) => {
        console.log('login success');
        console.log(data);
        this.router.navigateByUrl('accounts');
      },
      error: (e) => {
        this.textMessage = e.error.text;
      },
    });
  }
}
