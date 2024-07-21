import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/Pokemon';
import { DetailsPage } from '../details/details.page';
import { CustomResponse } from '../models/CustomResponse';
import { UserService } from '../services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemons: Pokemon[] = [];
  offset = 0;
  search = '';
  limit = 50
  pokemonsFavId: number[] = []
  idUserLog: number = 0
  @ViewChild('modal', { static: true }) modal: any;
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  constructor(private pokemonService: PokemonService, private userService: UserService,
    private modalCtrl: ModalController, private authService: AuthenticationService,
    private loadingController: LoadingController) {
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    try {
      this.idUserLog = (await this.authService.getLogUser()).id;
      await this.loadPokemons();
    } finally {
      await this.loadingController.dismiss()
    }
  }

  scrollToTop() {
    this.content.scrollToTop(400);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'circles'
    });
    await loading.present();
  }


  logout(){
    this.authService.logout();
  }

  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search = filterValue.trim().toLowerCase();
    await this.findPokemons(this.search, this.limit, 0)
  }

  async clearFilter() {
    await this.findPokemons('', this.limit, 0)
  }

  async findPokemons(search: string, limit: number, offset: number) {
    const response: CustomResponse = await this.pokemonService
    .getPokemonsWithFavorites(search, limit, offset, this.idUserLog);
    if (response.ok && response.data.length > 0) {
      this.pokemons = response.data;
    }
  }

  private async loadPokemons() {
    const response: CustomResponse = await this.pokemonService
    .getPokemonsWithFavorites(this.search, this.limit, this.offset, this.idUserLog);
    if (response.ok && response.data.length > 0) {
      this.pokemons.push(...response.data); // Adiciona os próximos pokémons à lista de pokémons
      this.offset += this.limit; // Incrementa o offset para a próxima página
    }
  }

  trackByPokemonId(index: number, pokemon: any): number {
    return pokemon.id;
  }

  async openModal(idPokemon: number, favorite: boolean) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: { idPokemon: idPokemon, favorite: favorite }
    });
    await modal.present();
    let { data, role } = await modal.onWillDismiss();
    this.updateFavorite(idPokemon, data)
  }

  updateFavorite(idPokemon: number, favorite: boolean) {
    const pokemonToUpdate = this.pokemons.find(pokemon => pokemon.id === idPokemon);
    if (pokemonToUpdate!.favorite != favorite) {
      pokemonToUpdate!.favorite = favorite;
      if (favorite)
        this.userService.setPokemonFavorite(this.idUserLog, idPokemon)
      else {
        this.userService.unsetPokemonFavorite(this.idUserLog, idPokemon)
      }
    }
  }

  getCardGroups() {
    const groups = [];
    for (let i = 0; i < this.pokemons.length; i += 4) {
      groups.push(this.pokemons.slice(i, i + 4));
    }
    return groups;
  }

  onIonInfinite(ev: any) {
    this.loadPokemons();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
