import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonLite, PokemonResponse } from '@models/pokemon';
import {
  forkJoin, map, Observable, Subject, switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class PokemonService {
  private readonly END_POINT = '/api/v2/pokemon';

  private readonly LIMIT_QUERY_PARAM = '?limit=10';

  private pokemonSubject = new Subject<Pokemon[]>();

  private deletedNames: string[] = [];

  private addedPokemon: Pokemon[] = [];

  public pokemonObservable = this.pokemonSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  public fetchPokemon(filter = ''): void {
    const call = filter
      ? this.fetchByName(filter).pipe(map((pokemon: Pokemon) => [pokemon]))
      : this.getAll();

    call.subscribe((data: Pokemon[]) => {
      this.pokemonSubject.next([
        ...data
          .filter((pokemon: Pokemon) => !this.deletedNames.includes(pokemon.name))
          .map((pokemon: Pokemon) => this.mapInMemoryPokemon(pokemon)),
        ...this.addedPokemon.filter((pokemon: Pokemon) => !data
          .some((a: Pokemon) => a.name === pokemon.name)),
      ]);
    });
  }

  public addEdit(pokemon: Pokemon): void {
    this.addedPokemon = [...this.addedPokemon, pokemon];
  }

  public fetchByName(name: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`${this.END_POINT}/${name}`);
  }

  public delete(name: string): void {
    this.deletedNames = [...this.deletedNames, name];
    this.fetchPokemon();
  }

  public addToDeletedList(name: string): void {
    this.deletedNames = [...this.deletedNames, name];
  }

  private mapInMemoryPokemon(pokemon: Pokemon): Pokemon {
    const match = this.addedPokemon
      .find((addedP: Pokemon) => (addedP.name === pokemon.name));
    return {
      ...pokemon,
      name: match ? match.name : pokemon.name,
      weight: match ? match.weight : pokemon.weight,
      height: match ? match.height : pokemon.height,
    };
  }

  private getAll(): Observable<Pokemon[]> {
    return this.httpClient.get<PokemonResponse>(`${this.END_POINT}${this.LIMIT_QUERY_PARAM}`).pipe(
      map((data: PokemonResponse) => data.results.map((element: PokemonLite) => element.url)),
      switchMap((urls: string[]) => forkJoin(urls
        .map((url: string) => this.fetchPokemonData(url)))),
    );
  }

  private fetchPokemonData(url: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(url);
  }
}
