import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll } from '@ionic/angular';
import { PokemonService } from '../services/PokemonService';
import { Pokemon } from '../models/Pokemon';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];
  offset = 0;

  constructor(private pokemonService: PokemonService) { }

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

  getCardGroups() {
    const groups = [];
    for (let i = 0; i < this.pokemons.length; i += 4) {
      groups.push(this.pokemons.slice(i, i + 4));
    }
    return groups;
  }

  async onIonInfinite(ev: any) {
    setTimeout(async () => {
      await this.loadPokemons(); // Carrega mais pokémons
      if (ev && ev.target) {
        ev.target.complete(); // Completa o evento de rolagem infinita
      } else {
        console.error('Event target is null');
      }
    }, 1000);
  }
}
