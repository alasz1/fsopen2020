const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum.reduce((a, b) => {
            return a + b[item]
        }, 0)
    }
    const total = reducer(blogs, 'likes')
    return total
}

const mostLikedBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(a => a.likes), 0);
    const blogWithMostLikes = blogs.find(a => a['likes'] === maxLikes)
    const result = {
        title: blogWithMostLikes.title,
        author: blogWithMostLikes.author,
        likes: blogWithMostLikes.likes
    }
    return result
}

const mostBlogs = (blogs) => {

    const authors = []
    blogs.forEach(a => authors.push(a.author))

    let blogsPerAuthor = Object.values(authors.reduce((author, blogs) => {
        author[blogs] = author[blogs] || [blogs, 0]
        author[blogs][1]++
        return author
    }, {})).map(o => ({ 'author': o[0], 'blogs': o[1] }))

    const maxBlogs = Math.max(...blogsPerAuthor.map(a => a.blogs), 0);
    const authorWithMostBlogs = blogsPerAuthor.find(a => a['blogs'] === maxBlogs)
    const result = {
        author: authorWithMostBlogs.author,
        blogs: authorWithMostBlogs.blogs
    }
    return result
}

const mostLikes = (blogs) => {

    // count number of total likes per author => return name and total likes of most liked author

    return result
}

module.exports = {
    dummy,
    totalLikes,
    mostLikedBlog,
    mostBlogs,
    mostLikes
}