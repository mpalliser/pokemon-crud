import { CommonModule } from '@angular/common';
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
  ],
  templateUrl: './list.component.html',
})
export default class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'height', 'weight', 'actions'];

  dataSource: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.pokemonSubscription.subscribe((pokemons: Pokemon[]) => {
      this.dataSource = pokemons;
    });
    this.pokemonService.fetchPokemon();
  }
}
