import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar color="primary">
      <span>Resolve Guard:</span>
      <a mat-button routerLink="/">Users</a>
    </mat-toolbar>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .content {
        padding: 20px;
        box-sizing: border-box;
      }
    `,
  ],
})
export class AppComponent {}
