import { PokemonController } from 'controllers/PokemonController';
import express from 'express';
const router = express.Router();
const pokemonController = new PokemonController()

router.get('/favorites/:idUser', pokemonController.findAllWithFavorites);
router.get('/:id', pokemonController.findById);

module.exports = router;
export default router;