import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { hashPassword } from '../services/authService';
import { comparePassword, generateToken } from '../services/authService';

 const updateUser = async (req: Request, res: Response) => {
   try {
     const { id } = req.params; 
     const { username, email, password , profilePhoto } = req.body;
    
     const user = await User.findById(id);

     if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }

     if (username) user.username = username;
     if (email) user.email = email;
     if(profilePhoto) user.profilePhoto = profilePhoto
     
     if (password) {
       const hashedPassword = await hashPassword(password);
       user.password = hashedPassword;
     }

    await user.save();
    res.json({
      message: 'Kullanıcı bilgileri güncellendi',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Bir hata oluştu' });
  }
};


const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params; 
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.json({
      message: 'Kullanıcı bilgileri getirildi',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Bir hata oluştu' });
  }
};





const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı yog' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Geçersiz şifre' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Giriş başarılı',
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Bir hata oluştu' });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email,password } = req.body;
    const newUser: IUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({
      message: 'Kullanıcı oluşturuldu',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Bir hata oluştu' });

  }
};

export { getUser, registerUser,updateUser,loginUser };
































