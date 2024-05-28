import { prisma } from '../../prisma/client';
import { TypeErrorsEnum } from 'enum/TypeErrorsEnum';
import axios from 'axios';
import { Pokemon } from 'models/Pokemon';

const PokeAPI = "https://pokeapi.co/api/v2"
const prefixImage = './assets/pokemons/'
const fileType = '.gif'
export class PokemonService {

    async findAll(search: string, limit: number, offset: number) {
        try {
            const response =  await axios.get(`${PokeAPI}/pokemon?limit=706`)
            let pokemons = response.data.results;
            if(search){
                pokemons = pokemons.filter(pokemon =>
                    pokemon.name.toLowerCase().includes(search.toLowerCase())
                );
            }
            const slicedPokemons = pokemons.slice(offset, offset + limit);
            return { ok: true, message: "Found successfully!", data: this.formatPokemonList(slicedPokemons)};
        } catch (error) {
            console.error(error);
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
    }

    async createIfNotExist(pokemon: Pokemon){
        try{
            const createdPoke = await prisma.pokemon.upsert({
                where: {
                    id: pokemon.id
                },
                update:{},
                create: {
                    id: pokemon.id,
                    name: pokemon.name
                }
            });
    
            return { ok: true, message: "Found successfully!", data: createdPoke };
        } catch(error){
            console.error(error);
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
    }

    async findById(idPoke: number){
        try {
            const response =  await axios.get(`${PokeAPI}/pokemon/${idPoke}`)
            const { stats, height, id, weight, name } = response.data;
            const pokemon = { stats, height, id, weight, name: this.capitalize(name), 
                image: prefixImage + id + fileType };

            return { ok: true, message: "Found successfully!", data: pokemon};
        } catch (error) {
            console.error(error);
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
    }

    async findFavsByUser(idUser: number) {
        try {
          const pokesFav = await prisma.user_fav_pokemon.findMany({
            where:{
                user_id: idUser
            }
          })
          return { ok: true, message: "Found successfully!", data: pokesFav };
        } catch (error) {
            console.log(error);
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
      }

    private formatPokemonList(pokemonList: Pokemon[]){
        return pokemonList.map((entry: any) => ({
            id: this.getIdFromUrl(entry.url),
            name: this.capitalize(entry.name),
            image: prefixImage + this.getIdFromUrl(entry.url) + fileType
          }));
    }

    private getIdFromUrl(url: string): number {
        const parts = url.split('/');
        return +parts[parts.length - 2];
    }

    private capitalize(palavra: string){
        return palavra.charAt(0).toUpperCase() + palavra.slice(1)
    }
}
