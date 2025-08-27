import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
    selector: 'app-logout',
    standalone: true,
    template: `
        <div class="auth-wrapper">
            <h1>Logged out</h1>
            <div class="card">
                <p>You have been successfully logged out. You'll be redirected to the login page in a moment...</p>
                <button (click)="goToLogin()">Go to Login</button>
            </div>
        </div>
    `,
    styles: `
        .auth-wrapper { max-width: 360px; margin: 56px auto; padding: 0 16px; }
        .card { display:flex; flex-direction:column; gap:8px; background:#fff; border:1px solid #e5e7eb; padding:16px; border-radius:10px; align-items: center; }
        button { margin-top:8px; padding:10px; border:none; border-radius:6px; background:#2563eb; color:white; font-weight:600; cursor:pointer; }
        button:disabled { background:#94a3b8; cursor:not-allowed; }
        h1 { color:#2563eb; }
        p { color:#334155; }
    `
})
export class Logout {
    constructor(private authService: AuthService, private router: Router) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigateByUrl('/login');
        }
        this.authService.logout().subscribe(() => {
            this.router.navigateByUrl('/login');
        });
    }

    goToLogin() {
        this.router.navigateByUrl('/login');
    }
}
