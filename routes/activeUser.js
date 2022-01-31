import express from 'express';

import {getActiveUsers, deleteAllActiveUsers, deleteActiveUser} from "../controllers/activeUser.js";

const router = express.Router();

router.get('/',getActiveUsers);
router.delete('/all',deleteAllActiveUsers);
router.delete('/:id', deleteActiveUser);

export default router