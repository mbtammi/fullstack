const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)  
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')
  
    const authors = response.body.map(r => r.author)
  
    expect(authors).toContain(
      'Miro'
    )
  })

  test('Blog identifier is called id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('Valid blog can be added normally', async () => {
    const newBlog = {
        title: 'Javascript is fun and painful',
        author: 'Marco',
        url: "www.com",
        likes: 12
      }
    await api
    .post('/api/blogs')
    .set('Authorization', 'abc123')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const authors = blogsAtEnd.map(n => n.author)
    expect(authors).toContain(
      'jefe'
    )
  })

  test('Blog without title cannot be added', async () => {
    const newBlog = {
        author: 'Miro the brogrammer',
        url: "www.com",
        likes: 12
      }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  
  test('Blog without likes will work fine', async () => {
    const blog = {
        title: "Blog about birds",
        author: 'Miro the brogrammer',
        url: "www.com"
      }
    await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBeGreaterThanOrEqual(0)
  })

  test('Blog can be deleted', async () => {
    const response = await api.get('/api/blogs')

    console.log("TOINEN ID ", response.body[1].id)

    const id = response.body[1].id

    await api
    .delete('/api/blogs/' + id)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1) //Koska yksi pienempi
  })

  test('Blog update successful ', async () => {

    const newBlog = {
      title:"Masterpiece",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const foundBlog = blogsAtEnd.find(blog => blog.likes === 13)
    expect(foundBlog.likes).toBe(13)
  })


  test('Blogs likes can be changed', async () => {
    const response = await api.get('/api/blogs')

    console.log("TOINEN ID ", response.body[1].id)

    const likes = response.body[1].likes
    const body = response.body[1]
    response.body[1].likes += 10

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes + 1000
    }

    await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)

    console.log("EKA LIKET: ", response.body[1].likes + " TOKA LIKET: ", blog.likes)


    expect(blog.likes).toBeGreaterThanOrEqual(likes + 5)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1) 
  })

afterAll(() => {
  mongoose.connection.close()
})