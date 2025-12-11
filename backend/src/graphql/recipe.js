import { getUserInfoById } from '../services/users.js'
export const recipeSchema = `#graphql
type Recipe {
id: ID!
title: String!
author: User
ingredients: String
instructions: String
imageURL: String
likedBy: [ID!]
likesCount: Int
tags: [String!]
createdAt: Float
updatedAt: Float
}
`
export const recipeResolver = {
  Recipe: {
    id: (recipe) => recipe._id || recipe.id,
    likesCount: (recipe) => recipe.likesCount || 0,
    likedBy: (recipe) => recipe.likedBy || [],
    author: async (recipe) => {
      return await getUserInfoById(recipe.author)
    },
  },
}
