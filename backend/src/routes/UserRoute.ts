import { UserController } from '../controllers/UserController';
import express from 'express';
const router = express.Router();
const userController = new UserController()

router.post('/login',  userController.login);
router.post('/', userController.createUser);
router.post('/fav/:idUser/:idPokemon', userController.favPokemon);
router.delete('/unfav/:idUser/:idPokemon', userController.unFavPokemon);

module.exports = router;
export default router;