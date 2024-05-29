import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/Pokemon'
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../models/CustomResponse';
import { BehaviorSubject, firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  async setPokemonFavorite(idUser: number, idPokemon: number): Promise<CustomResponse> {
    try {
      const response: CustomResponse = await firstValueFrom(this.http
        .post(`${environment.backend}/users/fav/${idUser}/${idPokemon}`, {})) as CustomResponse;
      return response;
    } catch (error) {
      return { ok: false, message: 'Error Requesting Backend', data: error}
    }
  }
  
  async unsetPokemonFavorite(idUser: number, idPokemon: number): Promise<CustomResponse> {
    try {
      const response: CustomResponse = await firstValueFrom(this.http
        .delete(`${environment.backend}/users/unfav/${idUser}/${idPokemon}`)) as CustomResponse;
      return response;
    } catch (error) {
      return { ok: false, message: 'Error Requesting Backend', data: error}
    }
  }

}