import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/Pokemon'

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  API = 'https://pokeapi.co/api/v2'
  constructor(private http: HttpClient) { }

  async getPokemons(offset: number): Promise<any> {
    try {
      const response: any = await this.http.get(`${this.API}/pokemon?limit=${20}&offset=${offset}`).toPromise();
      const pokedex: Pokemon[] = response.results.map((entry: any) => ({
        id: this.getIdFromUrl(entry.url),
        name: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
        favorite: false,
        image: './assets/pokemons/' + this.getIdFromUrl(entry.url) + '.gif'
      }));
      return pokedex;
    } catch (error) {
      return error
    }
  }

  async getPokemonById(id: number) {
    try {
      const response: any = await this.http.get(`${this.API}/pokemon/${id}`).toPromise();
      const pokemon: Pokemon = {
        ...response,
        name: response.name.charAt(0).toUpperCase() + response.name.slice(1),
        image: './assets/pokemons/' + id + '.gif'
      };
      return pokemon;
    } catch (error) {
      return error
    }
  }

  private getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }

}