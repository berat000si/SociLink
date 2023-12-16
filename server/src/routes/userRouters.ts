import express, { Router } from 'express';
import { getUser, loginUser, registerUser, updateUser } from '../controllers/userController';

const router: Router = express.Router();

router.get('/:username', getUser);
router.post('/accounts/login', loginUser);
router.post('/accounts/register', registerUser);


router.put("/accounts/:id",updateUser)

export default router;
