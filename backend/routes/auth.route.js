import express from 'express';
import { Login, Logout, SignUp , authCheck } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/protected.route.js';

const router=express.Router();

router.post("/signup",SignUp);
router.post("/login",Login);
router.post("/logout",Logout);

router.get('/authCheck',protectedRoute,authCheck);

export default router;