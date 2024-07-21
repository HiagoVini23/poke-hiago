import { UserController } from '../controllers/UserController';
import { AuthenticationService } from 'middlewares/authentication';
import express from 'express';
const router = express.Router();
const userController = new UserController()
const auth = new AuthenticationService()

router.post('/login',  userController.login);
router.post('/', userController.createUser);
router.post('/fav/:idUser/:idPokemon', auth.validate ,userController.favPokemon);
router.delete('/unfav/:idUser/:idPokemon', auth.validate, userController.unFavPokemon);

module.exports = router;
export default router;