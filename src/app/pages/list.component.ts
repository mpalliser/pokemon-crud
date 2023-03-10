import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Pokemon } from '@models/pokemon';
import PokemonService from '@services/pokemon.service';

@Component({
  standalone: true,
  selector: 'app-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [PokemonService],
  templateUrl: './list.component.html',
})
export default class ListComponent {
  displayedColumns: string[] = ['name', 'type', 'actions'];

  dataSource: Pokemon[] = [
    { name: 'pikachu', type: 'electric' },
    { name: 'charmander', type: 'fire' },
    { name: 'bulbasur', type: 'plant' },
    { name: 'squirtel', type: 'water' },
  ];
}
