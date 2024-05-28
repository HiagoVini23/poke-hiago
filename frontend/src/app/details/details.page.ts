import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PokemonService } from '../services/PokemonService';
import { Pokemon } from '../models/Pokemon';
import { CustomResponse } from '../models/CustomResponse';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  idPokemon: number;
  favorite: boolean;
  poke: Pokemon | null = null;

  constructor(private modalCtrl: ModalController, private navParams: NavParams,
    private pokemonService: PokemonService) { 
    this.idPokemon = this.navParams.get('idPokemon');
    this.favorite = this.navParams.get('favorite');
    this.findPokemon()
  }

  close() {
    return this.modalCtrl.dismiss(this.favorite);
  }

  async findPokemon(){
    const response: CustomResponse = await this.pokemonService.getPokemonById(this.idPokemon) as CustomResponse
    if (response.ok){
      this.poke = response.data
    }
  }

}
