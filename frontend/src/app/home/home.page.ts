import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PokemonService } from '../services/PokemonService';
import { Pokemon } from '../models/Pokemon';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];
  offset = 0;
  @ViewChild('modal', { static: true }) modal: any;

  constructor(private pokemonService: PokemonService, 
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadPokemons();
  }

  private async loadPokemons() {
    try {
      const nextPokemons: Pokemon[] = await this.pokemonService.getPokemons(this.offset);
      if (nextPokemons.length > 0) {
        this.pokemons.push(...nextPokemons); // Adiciona os próximos pokémons à lista de pokémons
        this.offset += 20; // Incrementa o offset para a próxima página
      }
    } catch (error) {
      console.error('Error loading pokémons:', error);
    }
  }

  async openModal(idPokemon: number, favorite: boolean) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: { idPokemon: idPokemon, favorite: favorite}
    });
    await modal.present();
    let {data, role} = await modal.onWillDismiss();
    this.updateFavorite(idPokemon, data)
  }

  updateFavorite(idPokemon: number, favorite: any){
    const pokemonToUpdate = this.pokemons.find(pokemon => pokemon.id === idPokemon);
    if(pokemonToUpdate!.favorite != favorite)
      pokemonToUpdate!.favorite = favorite;
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
