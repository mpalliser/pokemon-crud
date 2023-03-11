import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import PokemonService from '@services/pokemon.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-filter',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './filter.component.html',
})
export default class FilterComponent implements OnInit, OnDestroy {
  pokemonFormControl: FormControl = new FormControl<string>('');

  private destroySubscriptions = new Subject();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        takeUntil(this.destroySubscriptions),
      ).subscribe((value: string) => this.pokemonService.fetchPokemon(value));
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.next({});
    this.destroySubscriptions.complete();
  }
}
