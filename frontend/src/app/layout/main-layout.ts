import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">TaskManager</div>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          <!-- Add more links later -->
        </nav>
      </aside>
      <div class="content">
        <header class="topbar">
          <div class="spacer"></div>
          <a routerLink="/logout" class="logout">Logout</a>
        </header>
        <main class="main">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: `
    :host, .layout { display: flex; height: 100vh; }
    .sidebar { width: 240px; background:#0f172a; color:#e2e8f0; padding: 16px; box-sizing: border-box; }
    .brand { font-weight: 700; font-size: 1.1rem; margin-bottom: 24px; }
    nav { display: flex; flex-direction: column; gap: 8px; }
    nav a { color: #cbd5e1; text-decoration: none; padding: 8px 10px; border-radius: 6px; }
    nav a.active, nav a:hover { background: #1e293b; color: #fff; }
    .content { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .topbar { height: 56px; display: flex; align-items: center; justify-content: flex-end; padding: 0 16px; border-bottom: 1px solid #e5e7eb; }
    .logout { color: #334155; text-decoration: none; font-weight: 600; }
    .logout:hover { text-decoration: underline; }
    .main { padding: 16px; box-sizing: border-box; overflow: auto; height: calc(100vh - 56px); }
  `,
})
export class MainLayout {}
