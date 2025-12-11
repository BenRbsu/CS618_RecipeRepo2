import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Recipe } from './Recipe.jsx'
export function RecipeList({ recipes = [], onLike }) {
  return (
    <div>
      {recipes.map((recipe) => {
        const recipeId = recipe.id || recipe._id
        return (
          <Fragment key={recipeId}>
            {onLike ? (
              <Recipe {...recipe} onLike={() => onLike(recipeId)} />
            ) : (
              <Recipe {...recipe} />
            )}
            <hr />
          </Fragment>
        )
      })}
    </div>
  )
}
RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe.propTypes)).isRequired,
  onLike: PropTypes.func,
}
