import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      _id: blog.id,
      user: blog.user,
      likes: blog.likes + 1
  }
    handleLike(blog.id, updatedBlog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove ${blog.title} ?`)) {
      handleDelete(blog.id, blog)
    } else return null
    
  }


  return (
    <div style={blogStyle}>
      <div> 
        {blog.title}, By:  {blog.author} {}<button onClick={toggleVisibility} >{visible ? 'hide' : 'view' }</button>
      </div>
      {visible && (
        <div>
            <div>
            {blog.url}
            </div>
            <div>
            {blog.user.name}
            </div>
            <div>
            Likes: {blog.likes} <button onClick={addLike}> like </button>{" "}
            </div>
            <div>
            <button onClick={removeBlog}> Remove </button>{" "}
            </div>
          </div>
        // <div>
        //   <div>{blog.url}</div>
        //   <div>
        //     Likes: {blog.likes}{" "}
        //     <button id="like-btn" onClick={() => console.log("like")}>
        //       like
        //     </button>{" "}
        //   </div>
        //   <div>{blog.user}</div>
        //   {blog.username === username && (
        //     <button id="delete-btn" onClick={() => console.log("delete")}>
        //       delete
        //     </button>
        //   )}
        // </div>
        // <div>{blog.likes}</div>
      )}
    </div>
  
)}

export default Blog