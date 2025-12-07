import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'

import dotenv from 'dotenv'
dotenv.config()

await initDatabase()

const recipe = new Recipe({
  title: 'Hello from the outside!',
  author: 'Some Person',
  ingredients: 'Example ingredients list',
  instructions: 'Example instructions',
  tags: ['other'],
})

await recipe.save()
const recipes = await Recipe.find()
console.log(recipes)
