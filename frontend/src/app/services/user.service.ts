import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pokemon } from '../models/Pokemon'
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../models/CustomResponse';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  async createUser(user: User): Promise<any> {
    try {
      const response: CustomResponse = await lastValueFrom(this.http
        .post(`${environment.backend}/users`, user)) as CustomResponse;
      return response;
    } catch (error) {
      return error
    }
  }

  async setPokemonFavorite(idUser: number, idPokemon: number): Promise<any> {
    try {
      const response: CustomResponse = await firstValueFrom(this.http
        .post(`${environment.backend}/users/fav/${idUser}/${idPokemon}`, {})) as CustomResponse;
      return response;
    } catch (error) {
      return error
    }
  }
  
  async unsetPokemonFavorite(idUser: number, idPokemon: number): Promise<any> {
    try {
      const response: CustomResponse = await firstValueFrom(this.http
        .delete(`${environment.backend}/users/unfav/${idUser}/${idPokemon}`)) as CustomResponse;
      return response;
    } catch (error) {
      return error
    }
  }

}