import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import FilterComponent from '@components/filter/filter.component';
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
    FilterComponent,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './list.component.html',
})
export default class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'height', 'weight', 'actions'];

  dataSource: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.pokemonService.pokemonObservable.subscribe((pokemons: Pokemon[]) => {
      this.dataSource = pokemons;
    });
    this.pokemonService.fetchPokemon();
  }

  remove(pokemon: Pokemon): void {
    this.snackbar.open(`${pokemon.name} removed correctly`, 'Close', { duration: 3000 });
  }
}
