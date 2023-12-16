import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  userId: string;
  content: string;
  createdAt: Date;
  likes: number;
  comments: string[]; 
}

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], 
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;