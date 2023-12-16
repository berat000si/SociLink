import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const uri = 'mongodb://0.0.0.0:27017/SociLink'; 
    await mongoose.connect(uri);
    console.log('Connected MongoDB');
  } catch (error) {
    console.error('Error connecting MongoDB:', error);
  }
};

export default connectToDatabase;




