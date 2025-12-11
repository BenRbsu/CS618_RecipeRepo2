import { gql } from '@apollo/client/core/index.js'

export const RECIPE_FIELDS = gql`
  fragment RecipeFields on Recipe {
    id
    title
    ingredients
    instructions
    imageURL
    likesCount
    likedBy
    tags
    updatedAt
    createdAt
    author {
      username
    }
  }
`

export const GET_RECIPES = gql`
  ${RECIPE_FIELDS}
  query getRecipes($options: RecipeOptions) {
    recipes(options: $options) {
      ...RecipeFields
    }
  }
`

export const GET_RECIPES_BY_AUTHOR = gql`
  ${RECIPE_FIELDS}
  query getRecipesByAuthor($author: String!, $options: RecipeOptions) {
    recipesByAuthor(username: $author, options: $options) {
      ...RecipeFields
    }
  }
`
export const CREATE_RECIPE = gql`
  mutation createRecipe($title: String!, $ingredients: String, $instructions: String, $imageURL: String, $tags: [String!]) {
    createRecipe(title: $title, ingredients: $ingredients, instructions: $instructions, imageURL: $imageURL, tags: $tags) {
      id
      title
    }
  }
`

export const LIKE_RECIPE = gql`
  mutation likeRecipe($id: ID!) {
    likeRecipe(id: $id) {
      id
      likesCount
    }
  }
`
