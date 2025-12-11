import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'
import { useState } from 'react'

export function Recipe({ title, ingredients, instructions, imageURL, author, id, fullRecipe = false, likesCount = 0, onLike  }) {
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)
    try {
      await onLike()
    } finally {
      setIsLiking(false)
    }
  }

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
      <div style={{ marginTop: '10px' }}>
        {onLike && (
          <button onClick={handleLike} disabled={isLiking}>
            Like
          </button>
        )}
        <span style={{ marginLeft: '10px' }}>{likesCount} likes</span>
      </div>
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
  fullRecipe: PropTypes.bool,
  likesCount: PropTypes.number,
  onLike: PropTypes.func

}
 
