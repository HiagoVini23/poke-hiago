import { Request, Response } from 'express';
import { PokemonService } from '../services/PokemonService';
const pokemonService = new PokemonService();
import { getStatusResponseError } from '../utils/ErrorsHandling';

export class PokemonController {

    async findAll(req: Request, res: Response) {
        const { search='', limit, offset } = req.query;
        const response = await pokemonService.findAll(String(search), Number(limit), Number(offset));
        if (response.ok)
            return res.status(200).send(response)
        else {
            const status = getStatusResponseError(response)
            return res.status(status).send(response)
        }
    }

    async findById(req: Request, res: Response) {
        const response = await pokemonService.findById(Number(req.params.id));
        if (response.ok)
            return res.status(200).send(response)
        else {
            const status = getStatusResponseError(response)
            return res.status(status).send(response)
        }
    }

    async findFavsByUser(req: Request, res: Response) {
        const response = await pokemonService.findFavsByUser(Number(req.params.id));
        if (response.ok)
            return res.status(200).send(response)
        else {
            const status = getStatusResponseError(response)
            return res.status(status).send(response)
        }
    }
}
