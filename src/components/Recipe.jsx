import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({ title, ingredients, instructions, imageURL, author: userId }) {
  return (
    <article>
      <h3>{title}</h3>
      {imageURL && <img src={imageURL} alt={title} style={{ maxWidth: '100%', height: 'auto' }} />}
      <div>
        <strong>Ingredients:</strong>
        <p>{ingredients}</p>
      </div>
      <div>
        <strong>Instructions:</strong>
        <p>{instructions}</p>
      </div>
      {userId && (
        <em>
          <br />
          By <User id={userId} />
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
  author: PropTypes.string,
}
 
