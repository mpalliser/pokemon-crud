export interface Sprite {
  front_default: string;
}

export interface Type {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  stats: unknown;
  types: Type[];
  weight: number;
  height: number;
  sprites: Sprite[];
}

export interface PokemonResponse {
  count: string;
  results: PokemonLite[];
  previous: number;
  next: string;
}

export interface PokemonLite {
  name: string;
  url: string;
}
