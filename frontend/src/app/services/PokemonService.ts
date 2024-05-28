import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/Pokemon'
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../models/CustomResponse';
import { BehaviorSubject, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  API = 'https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) { }

  async getPokemons(search: string, limit: number, offset: number): Promise<CustomResponse> {
    const params = new HttpParams()
      .set('search', search)
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    try {
      const response: CustomResponse = await firstValueFrom(this.http.get(`${environment.backend}/pokemons`, 
      {params: params})) as CustomResponse;
      return response;
    } catch (error) {
      return { ok: false, message: 'Error Requesting Backend', data: error}
    }
  }

  async getPokemonById(id: number): Promise<CustomResponse> {
    try {
      const response: CustomResponse = await firstValueFrom(this.http.get(`${environment.backend}/pokemons/${id}`)) as CustomResponse;
      return response;
    } catch (error) {
      return { ok: false, message: 'Error Requesting Backend', data: error}
    }
  }

  async getPokemonsFavByUser(idUser: number): Promise<CustomResponse> {
    try {
      const response: CustomResponse = await firstValueFrom(this.http.get(`${environment.backend}/pokemons/favorites/${idUser}`)) as CustomResponse;
      return response
    } catch (error) {
      return { ok: false, message: 'Error Requesting Backend', data: error}
    }
  }

}