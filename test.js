const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

BlogPost.create({
    title: 'Test title',
    body: 'Test body'
}, (error, blogpost) =>{
    console.log(error, blogpost)
})

BlogPost.find({}, (error, blogpost) =>{
    console.log(error, blogpost)
})
