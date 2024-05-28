import { prisma } from '../../prisma/client';
import { compare } from "bcrypt";
import { hash } from "bcrypt";
import { TypeErrorsEnum } from 'enum/TypeErrorsEnum';
import { user } from '@prisma/client'

export class UserService {

    async findToLogin(email: string, password: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
            })
            if(user && await compare(password, user.password))
                return  { ok: true, message: "Login Succesfully!", data: user };
            return { ok: false, message: "Login Failed!", data: TypeErrorsEnum.NotFound};          
        } catch (error) {
            console.log(error);
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
    }

    async create(user: user) {
        try {
            user.password = await hash(user.password, 8);
            const createdUser = await prisma.user.create({ data: user })
            return { ok: true, message: "Created successfully!", data: createdUser };
        } catch (error: any) {
            console.log(error)
            if (error.meta.target.includes("email"))
                return { ok: false, message: "Email already exists", data: TypeErrorsEnum.AlreadyExists };
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
    }

    async createFavPokemon(idUser: number, idPokemon: number){
        try{
            const favorited = await prisma.user_fav_pokemon.create({
                data:{
                    user_id: idUser,
                    pokemon_id: idPokemon
                }
            })
            return { ok: true, message: "Favorited successfully!", data: favorited };
        }catch(error){
            console.log(error);
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
    }

    async deleteFavPokemon(idUser: number, idPokemon: number){
        try{
            const favorited = await prisma.user_fav_pokemon.delete({
                where:{
                    pokemon_id_user_id:{
                        user_id: idUser,
                        pokemon_id: idPokemon
                    }
                }
            })
            return { ok: true, message: "Favorited successfully!", data: favorited };
        }catch(error){
            console.log(error);
            return { ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal };
        }
    }

}