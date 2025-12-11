import {
  getRecipeById,
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByTag,
} from '../services/recipes.js'
export const querySchema = `#graphql
input RecipeOptions {
sortBy: String
sortOrder: String
}
type Query {
test: String
recipes(options: RecipeOptions): [Recipe!]!
recipesByAuthor(username: String!, options: RecipeOptions): [Recipe!]!
recipesByTag(tag: String!, options: RecipeOptions): [Recipe!]!
recipeById(id: ID!): Recipe
}
`
export const queryResolver = {
  Query: {
    test: () => {
      return 'Hello World from GraphQL!'
    },
    recipes: async (parent, { options }) => {
      return await listAllRecipes(options)
    },
    recipesByAuthor: async (parent, { username, options }) => {
      return await listRecipesByAuthor(username, options)
    },
    recipesByTag: async (parent, { tag, options }) => {
      return await listRecipesByTag(tag, options)
    },
    recipeById: async (parent, { id }) => {
      return await getRecipeById(id)
    },
  },
}
