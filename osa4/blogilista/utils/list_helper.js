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

const mostLikes = (blogs) => {
    const maxLikes = Math.max(...blogs.map(a => a.likes), 0);
    const blogWithMostLikes = blogs.find(a => a['likes'] === maxLikes)
    const result = {
        title: blogWithMostLikes.title,
        author: blogWithMostLikes.author,
        likes: blogWithMostLikes.likes
    }
    return result
}

module.exports = {
    dummy,
    totalLikes,
    mostLikes
}