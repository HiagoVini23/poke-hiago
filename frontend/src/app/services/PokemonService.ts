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
      const pokedex: Pokemon[] = response.results.map((entry: any) => ({ // Utiliza a interface
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

  private getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }


  async getPokemonColor(id: number): Promise<any>{
    try{
        const response: any = await this.http.get(`${this.API}/pokemon-color/${id}`).toPromise()
        return response.name
    }catch(error){
        return error
    }
  }

}