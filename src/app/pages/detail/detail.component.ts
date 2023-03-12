import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pokemon } from '@models/pokemon';
import PokemonService from '@services/pokemon.service';
import {
  filter, map, switchMap, tap,
} from 'rxjs';

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
    name: new FormControl<string>('', [Validators.required]),
    weight: new FormControl<number | undefined>(undefined, [Validators.required]),
    height: new FormControl<number | undefined>(undefined, [Validators.required]),
  });

  isEdit = false;

  initialName: string | undefined;

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

  commit(): void {
    if (this.form.invalid) {
      this.snackBar.open('Review mandatory fields', 'Close');
    } else {
      if (this.initialName && this.initialName !== this.form?.get('name')?.value) {
        this.pokemonService.addToDeletedList(this.initialName);
      }
      this.pokemonService.addEdit(this.form.value);
      this.snackBar.open(`Pokemon ${this.isEdit ? 'edited' : 'created'} correctly!`, 'Close', { duration: 3000 });
      this.router.navigate(['/list']);
    }
  }

  private onGetPokemon(pokemon: Pokemon): void {
    const { name, weight, height } = pokemon;
    this.initialName = name;
    this.form.patchValue({ name, weight, height });
  }

  private routeParamsBehavior(): void {
    this.activatedRoute.params
      .pipe(
        filter((params: Params) => params['name']),
        map((params: Params) => params['name']),
        tap(() => { this.isEdit = true; }),
        switchMap((pokemon: string) => this.pokemonService.fetchByName(pokemon)),
      ).subscribe((pokemon: Pokemon) => this.onGetPokemon(pokemon));
    // TODO: still has issues when editing edited fields.
  }
}
