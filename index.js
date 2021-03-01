const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

app.listen(4000,() =>{
    console.log("App listening on port 4000")
})

const validateMiddleWare = require('./middleware/validationMiddleware');
app.use('/posts/store', validateMiddleWare)

const homeController = require('./controllers/home')
app.get('/', homeController)

const getPostController = require('./controllers/getPost')
app.get('/post/:id', getPostController)

const newPostConroller = require('./controllers/newPost')
app.get('/posts/new', newPostConroller)

const storePostController = require('./controllers/storePost')
app.post('/posts/store', storePostController)