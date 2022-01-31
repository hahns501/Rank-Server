import express from 'express';

import { getUsers, createUser, findUser, loginUser, logoutUser, updateUser, deleteUser} from '../controllers/user.js'

const router = express.Router();

router.get('/', getUsers);
router.post('/', findUser);
router.post('/login', loginUser);
router.post('/create', createUser);
router.post('/logout', logoutUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router