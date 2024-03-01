const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    published: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('BlogPost', blogPostSchema)
