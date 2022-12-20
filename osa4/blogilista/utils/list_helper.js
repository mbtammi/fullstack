const dummy = (blogs) => {
    return 1;
  }
const likes = (blogs) => {
    const likeCounter = (blogs) => {
        var likes = 0
        for (var i = 0; i < blogs.length; i++) {
            likes += blogs[i].likes;
        }    
        return likes
    }

    return blogs.length === 0
    ? 0 
    : likeCounter(blogs)
  }
  const favoriteBlog = (blogs) => {
    var t = [blogs[0].likes];
    var indeksi = 0;
    const favorite = (blogs) => {
        for (var i = 1; i < blogs.length; i++) {
            if(t < blogs[i].likes) {
                t = blogs[i].likes
                indeksi = i
            }
        }    
        // var blogi = {title: blogs[indeksi].title, author: blogs[indeksi].author, likes: blogs[indeksi].likes}
        return blogs[indeksi]
    }

    return blogs.length === 0
    ? "" 
    : favorite(blogs)
  }

  const mostBlogs = (blogs) => {
    //Counter that tells u who has the most blogs

    const mostBlogsCounter = (array) => {
    let a = [],
    b = [],
    arr = [...array] // clone array so we don't change the original when using .sort()

    arr.sort();

    for (var i = 1; i < array.length; i++) {
        if(array[i].author !== array[i-1].author) {
            a.push(array[i].author);
            b.push(1);
        }
        else ++b[b.length - 1];
        
    }   
    return [a, b]; 
}

    const result = mostBlogsCounter(blogs);

    var author = result[0]
    var blogiMaara = result[1]
    var objekti = "author: " + author + " blogs: " + blogiMaara
    
    return objekti
  }

  const mostLikes = (blogs) => {
    const authors = {}
    const popularAuthor = {
      author: '',
      likes: 0
    }
  
    blogs.forEach((blog) => {
      authors[blog.author] = authors[blog.author] ? authors[blog.author] + blog.likes : blog.likes
    })
  
    for (const [author, likes] of Object.entries(authors)) {
      if (likes > popularAuthor.likes) {
        popularAuthor.author = author
        popularAuthor.likes = likes
      }
    }
  
    return popularAuthor
  }
  
  module.exports = {
    dummy,
    likes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }