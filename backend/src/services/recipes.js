import { Recipe } from "../db/models/recipe.js";
import { User } from "../db/models/user.js"

export async function createRecipe(userId,{ title, ingredients, instructions, imageURL, tags }) {
  const recipe = new Recipe({ title, author: userId, ingredients, instructions, imageURL, tags });
  return await recipe.save();
}
async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}
export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}
export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
    return await listRecipes({ author: user._id }, options)
}
export async function listRecipesByTag(tags, options) {
  return await listRecipes({ tags }, options)
}
export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId)
}
export async function updateRecipe(userId, recipeId, { title, ingredients, instructions, imageURL, tags }) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author: userId },
    { $set: { title, ingredients, instructions, imageURL, tags } },
    { new: true },
  )
}
export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId })
}

export async function toggleLike(recipeId, userId) {
  const added = await Recipe.updateOne({ _id: recipeId, likedBy: { $ne: userId } }, { $addToSet: { likedBy: userId }, $inc: { likesCount: 1 } });
  if (added.modifiedCount === 0) { // already liked -> remove
    await Recipe.updateOne({ _id: recipeId }, { $pull: { likedBy: userId }, $inc: { likesCount: -1 } });
    return { liked: false, recipe: await Recipe.findById(recipeId) };
  } 
return { liked: true, recipe: await Recipe.findById(recipeId) };
}