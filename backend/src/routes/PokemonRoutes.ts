import { PokemonController } from 'controllers/PokemonController';
import { AuthenticationService } from 'middlewares/authentication';
import express from 'express';
const router = express.Router();
const pokemonController = new PokemonController()
const auth = new AuthenticationService()

router.get('/favorites/:idUser', auth.validate, pokemonController.findAllWithFavorites);
router.get('/:id', auth.validate, pokemonController.findById);

module.exports = router;
export default router;