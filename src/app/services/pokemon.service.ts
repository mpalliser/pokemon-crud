import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonLite, PokemonResponse } from '@models/pokemon';
import {
  forkJoin, map, Observable, switchMap,
} from 'rxjs';

@Injectable()
export default class PokemonService {
  private readonly END_POINT = '/api/v2/pokemon?limit=10';

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Pokemon[]> {
    return this.httpClient.get<PokemonResponse>(this.END_POINT).pipe(
      map((data: PokemonResponse) => data.results.map((element: PokemonLite) => element.url)),
      switchMap((urls: string[]) => forkJoin(urls
        .map((url: string) => this.fetchPokemonData(url)))),
    );
  }

  private fetchPokemonData(url: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(url);
  }
}
