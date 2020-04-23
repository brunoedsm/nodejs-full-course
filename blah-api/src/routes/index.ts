import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import PostsController from '../controllers/posts.controller';

const router = Router();

// Auth
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/register', AuthController.signUp);
router.get('/api/auth/profile', AuthController.profile);
router.delete('/api/auth/logout', AuthController.logout);

// Posts
router.get('/api/posts', PostsController.getAll);
router.post('/api/posts', PostsController.create);
router.get('/api/posts/friends', PostsController.friendsPosts);

export default router;