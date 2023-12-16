import { Request, Response } from 'express';
import User from '../models/user';
import Post, { IPost } from '../models/post';

const getPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; 
    const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const posts = await Post.find({ userId });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Hatası' });
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId; 
    const post = await Post.findById(postId); 

    if (!post) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Hatası' });
  }
};


const createPost = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; 
    const { content } = req.body; 

    const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const newPost: IPost = new Post({
      userId,
      content,
    });

    const savedPost = await newPost.save(); 
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Hatası' });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId; 
    const { content } = req.body; 

    const updatedPost = await Post.findByIdAndUpdate(postId, { content }, { new: true }); 

    if (!updatedPost) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Hatası' });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId; 

    const deletedPost = await Post.findByIdAndDelete(postId); 

    if (!deletedPost) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    res.status(200).json({ message: 'Gönderi başarıyla silindi' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Hatası' });
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
