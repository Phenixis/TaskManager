import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-wrapper">
      <h1>Create account</h1>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="card">
        <label>Full name</label>
        <input type="text" formControlName="name" placeholder="Jane Doe" />

        <label>Email</label>
        <input type="email" formControlName="email" placeholder="you@example.com" />

        <label>Password</label>
        <input type="password" formControlName="password" placeholder="••••••••" />

        <button type="submit" [disabled]="form.invalid">Create account</button>
      </form>

      <p class="muted">Already have an account? <a routerLink="/login">Login</a></p>
    </div>
  `,
  styles: `
    .auth-wrapper { max-width: 360px; margin: 56px auto; padding: 0 16px; }
    .card { display:flex; flex-direction:column; gap:8px; background:#fff; border:1px solid #e5e7eb; padding:16px; border-radius:10px; }
    input { padding:10px; border:1px solid #cbd5e1; border-radius:6px; }
    button { margin-top:8px; padding:10px; border:none; border-radius:6px; background:#16a34a; color:white; font-weight:600; cursor:pointer; }
    button:disabled { background:#94a3b8; cursor:not-allowed; }
    label { font-size: 0.9rem; color:#334155; }
    .muted { color:#64748b; margin-top: 8px; }
    a { color:#2563eb; text-decoration:none; }
    a:hover { text-decoration:underline; }
  `
})
export class Register {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    // We’ll just route to login for now
    // In real app, call signup service then redirect
    alert('Registered! Please login.');
  }
}
