import { merge, Observable } from "rxjs";
import { ResolveEnd, ResolveStart, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { filter, mapTo } from "rxjs/operators";

@Component({
  selector: "app-root",
  template: `
    <mat-progress-bar
      *ngIf="isLoading$ | async"
      mode="buffer"
      style="position: absolute;"
    ></mat-progress-bar>
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
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  private _showLoaderEvents$!: Observable<boolean>;
  private _hideLoaderEvents$!: Observable<boolean>;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this._showLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      mapTo(true)
    );
    this._hideLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      mapTo(false)
    );
    this.isLoading$ = merge(this._hideLoaderEvents$, this._showLoaderEvents$);
  }
}
