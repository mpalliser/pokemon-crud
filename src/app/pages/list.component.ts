import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    HttpClientModule,
  ],
  providers: [PokemonService],
  templateUrl: './list.component.html',
})
export default class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'height', 'weight', 'image'];

  dataSource: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getAll().subscribe((data: Pokemon[]) => {
      this.dataSource = data;
    });
  }
}
