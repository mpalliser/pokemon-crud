import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonLite, PokemonResponse } from '@models/pokemon';
import {
  forkJoin, map, Observable, Subject, switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class PokemonService {
  private readonly END_POINT = '/api/v2/pokemon';
  
  private readonly limit = '?limit=10';

  private pokemonSubject = new Subject<Pokemon[]>();

  public pokemonSubscription = this.pokemonSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  public fetchPokemon(filter?: string): void {
    this.getAll(filter).subscribe((data: Pokemon[]) => {
      this.pokemonSubject.next(data);
    });
  }

  private getAll(filter?: string): Observable<Pokemon[]> {
    const call = filter
      ? this.httpClient.get<Pokemon>(`${this.END_POINT}/${filter}`).pipe(map(pokemon => [pokemon]))
      : this.httpClient.get<PokemonResponse>(`${this.END_POINT}${this.limit}`).pipe(
          map((data: PokemonResponse) => data.results.map((element: PokemonLite) => element.url)),
          switchMap((urls: string[]) => forkJoin(urls
        .map((url: string) => this.fetchPokemonData(url)))));
    return call;
  }

  private fetchPokemonData(url: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(url);
  }
}
