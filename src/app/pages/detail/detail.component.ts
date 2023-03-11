import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pokemon } from '@models/pokemon';
import PokemonService from '@services/pokemon.service';
import { filter, map, switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './detail.component.html',
})
export default class DetailComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    height: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.routeParamsBehavior();
  }

  edit(): void {
    if (this.form.invalid) {
      this.snackBar.open('Review mandatory fields', 'Close');
    } else {
      this.snackBar.open('Pokemon edited correctly!', 'Close', { duration: 3000 });
      this.router.navigate(['/list']);
    }
  }

  private onGetPokemon(pokemon: Pokemon): void {
    const { name, weight, height } = pokemon;
    this.form.patchValue({ name, weight, height });
  }

  private routeParamsBehavior(): void {
    this.activatedRoute.params
      .pipe(
        filter((params: Params) => params['name']),
        map((params: Params) => params['name']),
        switchMap((pokemon: string) => this.pokemonService.fetchByName(pokemon)),
      ).subscribe((pokemon: Pokemon) => this.onGetPokemon(pokemon));
  }
}
