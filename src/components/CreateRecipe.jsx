import { useState } from 'react'
//import { useMutation, useQueryClient} from '@tanstack/react-query'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_RECIPE,
  GET_RECIPES,
  GET_RECIPES_BY_AUTHOR,
} from '../api/graphql/recipes.js'

import { useAuth } from '../contexts/AuthContext.jsx'
//import { createRecipe } from '../api/recipes.js'
import { Link } from 'react-router-dom'
import slug from 'slug'


export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [imageURL, setImageURL] = useState('')
  
  const [token] = useAuth()

  const [createRecipe, { loading, data }] = useGraphQLMutation(CREATE_RECIPE, {
    variables: { title, ingredients, instructions, imageURL },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_RECIPES, GET_RECIPES_BY_AUTHOR],
  })


  /*const queryClient = useQueryClient()
  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, ingredients, instructions, imageURL }), 
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })*/
 
  const handleSubmit = (e) => {
    e.preventDefault()
    //createRecipeMutation.mutate()
    createRecipe()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-ingredients'>Ingredients: </label>
        <textarea
          name='create-ingredients'
          id='create-ingredients'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-instructions'>Instructions: </label>
        <textarea
          name='create-instructions'
          id='create-instructions'
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-imageURL'>Image URL: </label>
        <input
          type='text'
          name='create-imageURL'
          id='create-imageURL'
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </div>
      <br />
      <br />
      <input
        type='submit'
        value={loading ? 'Creating...' : 'Create'}
        disabled={!title || loading}
      />
      {data?.createRecipe ? (
        <>
          <br />
                    Recipe{' '}
          <Link
            to={`/recipes/${data.createRecipe.id}/${slug(data.createRecipe.title)}`}
          >
            {data.createRecipe.title}
          </Link>{' '}
          created successfully!

        </>
      ) : null}
    </form>
  )
}