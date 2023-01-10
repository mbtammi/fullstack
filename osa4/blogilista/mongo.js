const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://full67shac23:${password}@cluster0.xoh2tup.mongodb.net/blogList?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: "Uusi ja hieno blogi",
    author: "Miro Tammenterho",
    url: "example.com",
    likes: 12343213323
});
Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog)
  })  
  mongoose.connection.close()
})

blog.save().then((result) => {
  console.log("blög saved!");
  mongoose.connection.close();
});
