import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { getUserController, updateUserController } from '../controllers/userController.js';

//router object
const router = express.Router();

//routes
//GET USERS DATA || POST
router.post('/getUser', userAuth, getUserController)


// UPDATE USER || PUT
router.put('/update-user', userAuth, updateUserController);

export default router;