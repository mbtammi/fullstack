import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [uri, setUri] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState("info")

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
      setErrorMessage('Signed in')
      setErrorStyle("info")
      console.log("TULI ERRORI")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setErrorStyle("error")
      console.log("TULI ERRORI")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: uri,
      user: user,
      likes: 0
    }
      blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`Created a blog named ${title} by ${author}`)
      setErrorStyle("info")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // setNewBlog()
    }).catch(error => {
      setErrorMessage(`Could not create blog named ${title}`)
      setErrorStyle("error")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)})
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  const blogForm = () => (
    <form onSubmit={handleNewBlog}>
      <div>
          Title
          <input
            type="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
      </div>
      <div>
          Author
          <input
            type="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
      </div>
      <div>
          URI
          <input
            type="uri"
            value={uri}
            name="Uri"
            onChange={({ target }) => setUri(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>  
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} typeOf={errorStyle} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in {<button onClick={handleLogout}>Log out</button>}</p>
          {blogForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
