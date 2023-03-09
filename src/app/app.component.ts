import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
  ],
  template: `
  App component
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'pokemon-crud';
}
