import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import FilterComponent from '@components/filter/filter.component';
import ToolbarComponent from '@components/toolbar/toolbar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    ToolbarComponent,
    FilterComponent,
  ],
  template: `
  <app-toolbar></app-toolbar>
  <app-filter></app-filter>
  <router-outlet></router-outlet>
  `,
})
export default class AppComponent {}
