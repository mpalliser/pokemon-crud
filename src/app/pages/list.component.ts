import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Pokemon } from '../models/pokemon';

@Component({
  standalone: true,
  selector: 'app-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
  <div class="container">
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 margin-top-1 table">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let element"> {{element.name}} </td>
      </ng-container>
  
      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef> Type </th>
        <td mat-cell *matCellDef="let element"> {{ element.type }} </td>
      </ng-container>
  
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let element">
          <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  </div>
  `,
})
export class ListComponent {
  displayedColumns: string[] = ['name', 'type', 'actions'];
  dataSource: Pokemon[] = [
    { name: 'pikachu', type: 'electric' },
    { name: 'charmander', type: 'fire' },
    { name: 'bulbasur', type: 'plant' },
    { name: 'squirtel', type: 'water' }
  ];
}
