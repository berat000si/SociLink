import express, { Router } from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/postController';

const router: Router = express.Router();

router.get('/posts', getPosts); 
router.get('/posts/:postId', getPost); 
router.post('/posts/:userId', createPost); 
router.put('/posts/:postId', updatePost); 
router.delete('/posts/:postId', deletePost); 

export default router;
