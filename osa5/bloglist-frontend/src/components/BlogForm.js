import { useState } from 'react' 

const BlogForm = ({ createBlog, User }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUri, setNewUri] = useState('') 

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUri,
        user: User,
        likes: 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUri('')
  }

return (
    <div>
        <h2>Create a new blog</h2>
    <form onSubmit={addBlog}>
      <div>
          Title 
          <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
      </div>
      <div>
          Author 
          <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
      </div>
      <div>
          URI 
          <input
            value={newUri}
            onChange={({ target }) => setNewUri(target.value)}
          />
      </div>
      <button type="submit">add blog</button>
    </form>  
    </div>
)
}

export default BlogForm