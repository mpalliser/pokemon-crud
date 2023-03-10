import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import ToolbarComponent from '@components/toolbar/toolbar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    ToolbarComponent,
  ],
  template: `
  <app-toolbar></app-toolbar>
  <router-outlet></router-outlet>
  `,
})
export default class AppComponent {}
