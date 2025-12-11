import mongoose, { Schema } from 'mongoose'
const recipeSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  ingredients: String,
  instructions: String,
  imageURL: String,
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },
  tags: [String],
},
  { timestamps: true },
)
export const Recipe = mongoose.model('recipe', recipeSchema)
