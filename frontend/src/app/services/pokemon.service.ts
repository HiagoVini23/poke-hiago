import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../models/CustomResponse';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  constructor(private http: HttpClient) { }

  async getPokemonsWithFavorites(search: string, limit: number, offset: number,
     idUser: number): Promise<any> {
    const params = new HttpParams()
      .set('search', search)
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    try {
      const response: CustomResponse = await firstValueFrom(this.http
        .get(`${environment.backend}/pokemons/favorites/${idUser}`,{params: params})) as CustomResponse;
      return response;
    } catch (error) {
      return error
    }
  }

  async getPokemonById(id: number): Promise<any> {
    try {
      const response: CustomResponse = await firstValueFrom(this.http
        .get(`${environment.backend}/pokemons/${id}`)) as CustomResponse;
      return response;
    } catch (error) {
      return error
    }
  }

}