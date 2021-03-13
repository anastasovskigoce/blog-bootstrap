const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectifauthenticatedMiddleware = require('./middleware/redirectIfAuthenticated')
const flash = require('connect-flash')

global.loggedIn = null

app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressSession({
    // TODO this should not be availible in the source code!
    secret: 'keyboard cat'
}))
app.use("*", (req, res,next) => {
    loggedIn = req.session.userId;
    next()
})
app.use(flash())

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
app.get('/posts/new', authMiddleware, newPostConroller)

const storePostController = require('./controllers/storePost')
app.post('/posts/store', authMiddleware, storePostController)

const newUserConroller = require('./controllers/newUser')
app.get('/auth/register', redirectifauthenticatedMiddleware, newUserConroller)

const storeUserConroller = require('./controllers/storeUser')
app.post('/users/register',redirectifauthenticatedMiddleware, storeUserConroller)

const loginController = require('./controllers/login')
app.get('/auth/login', redirectifauthenticatedMiddleware, loginController)

const loginUserController = require('./controllers/loginUser')
app.post('/users/login', redirectifauthenticatedMiddleware, loginUserController)

const logoutController = require('./controllers/logout')
app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound'))