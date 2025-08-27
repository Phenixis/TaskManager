import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  template: `
    <div class="auth-wrapper">
      <h1>Welcome back</h1>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="card">
        <label>Username</label>
        <input type="text" formControlName="username" placeholder="JohnDoe" (input)="onInputChange()" />

        <label>Password</label>
        <input type="password" formControlName="password" placeholder="••••••••" (input)="onInputChange()" />

        @if (errorMsg) {
          <div class="error">{{ errorMsg }}</div>
        }

        <button type="submit" [disabled]="form.invalid">Login</button>
      </form>

      <p class="muted">No account? <a routerLink="/register">Create one</a></p>
    </div>
  `,
  styles: `
    .auth-wrapper { max-width: 360px; margin: 56px auto; padding: 0 16px; }
    .card { display:flex; flex-direction:column; gap:8px; background:#fff; border:1px solid #e5e7eb; padding:16px; border-radius:10px; }
    input { padding:10px; border:1px solid #cbd5e1; border-radius:6px; }
    button { margin-top:8px; padding:10px; border:none; border-radius:6px; background:#2563eb; color:white; font-weight:600; cursor:pointer; }
    button:disabled { background:#94a3b8; cursor:not-allowed; }
    label { font-size: 0.9rem; color:#334155; }
    .muted { color:#64748b; margin-top: 8px; }
    a { color:#2563eb; text-decoration:none; }
    a:hover { text-decoration:underline; }
    .error { color: #dc2626; font-size: 0.95rem; }
  `
})
export class Login {
  form!: FormGroup;
  errorMsg: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.errorMsg = null; // Reset error before login

    this.authService.login(this.form.value.username, this.form.value.password).subscribe({
      next: (res) => {
        if (res === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMsg = 'Login failed: ' + res.error;
        }
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Login failed: Invalid credentials';
      }
    });
  }

  onInputChange() {
    if (this.errorMsg !== null) {
      this.errorMsg = null; // Reset error on input change
    }
  }
}

