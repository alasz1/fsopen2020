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

module.exports = {
    dummy,
    totalLikes
}