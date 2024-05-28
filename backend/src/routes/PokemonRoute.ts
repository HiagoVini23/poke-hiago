import { PokemonController } from 'controllers/PokemonController';
import express from 'express';
const router = express.Router();
const pokemonController = new PokemonController()

router.get('/', pokemonController.findAll);
router.get('/:id', pokemonController.findById);
router.get('/favorites/:id', pokemonController.findFavsByUser);

module.exports = router;
export default router;