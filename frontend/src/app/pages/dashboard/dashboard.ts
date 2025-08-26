import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="grid">
      <div class="card">
        <h3>Overview</h3>
        <p>Welcome to your dashboard. Start managing tasks.</p>
      </div>
      <div class="card">
        <h3>Quick stats</h3>
        <ul>
          <li>Tasks: 0</li>
          <li>Completed: 0</li>
          <li>Due today: 0</li>
        </ul>
      </div>
    </div>
  `,
  styles: `
    .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .card { background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:16px; }
    h3 { margin: 0 0 8px; }
  `
})
export class Dashboard {

}
