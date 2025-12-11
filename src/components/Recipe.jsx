import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'

export function Recipe({ title, ingredients, instructions, imageURL, author, id, fullRecipe = false  }) {
  return (
    <article>
      {fullRecipe ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/recipes/${id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullRecipe && <div>{ingredients} </div>}
       <br />
      {fullRecipe && <div>{instructions} </div>}
       <br />
      {fullRecipe && imageURL && <img src={imageURL} alt={title} />}
      {author && (
        <em>
          {fullRecipe && <br />}
          Written by <User {...author} />
        </em>
      )}
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  instructions: PropTypes.string,
  imageURL: PropTypes.string,
  author: PropTypes.shape(User.propTypes),
  id: PropTypes.string.isRequired,
  fullRecipe: PropTypes.bool

}
 
