
const express = require('express')
const db = require('./database')
const expressSession = require('express-session')
const fileupload = require('express-fileupload')
const connectSqlite3 = require('connect-sqlite3')
const SQLiteStore = connectSqlite3(expressSession)
// const cookieParser = require('cookie-parser')



const bodyParser = require('body-parser')

const expressHandlebars =
 require('express-handlebars')

const app = express()

app.use(fileupload());

app.use(expressSession({
    store: new SQLiteStore({db: "/DB/websiteDB", table: "sessions"}),             
    secret: 'victoria',
    resave: false,
    saveUninitialized: true
}))

/*app.get("/create-cookie", function(request, response){
    response.cookie("lastVisit", Date.now())
    // ...
    })
    
    app.use(cookieParser())
    app.get("/log-cookie", function(request, response){
    const lastVisit = parseInt(request.cookies.lastVisit)
    // ...
    })
*/
app.use(bodyParser.urlencoded({extended: false}))

app.engine('hbs', expressHandlebars({
 defaultLayout: 'main',
 extname: '.hbs'
}))

app.use(express.static('images'))

app.get('/', function(request, response) {
    const isLoggedIn = request.session.loggedin

    const model = {
        loggedin : isLoggedIn
    }
    response.render("home.hbs", model)
})

app.get('/home', function(request, response){
    const isLoggedIn = request.session.loggedin

    const model = {
        loggedin : isLoggedIn
    }

 response.render("home.hbs", model)
})

app.get('/contact', function(request, response){
    const isLoggedIn = request.session.loggedin

    const model = {
        loggedin : isLoggedIn
    }

    response.render("contact.hbs", model)
})

app.get('/about', function(request, response){
    const isLoggedIn = request.session.loggedin

    const model = {
        loggedin : isLoggedIn
    }

    response.render("about.hbs", model)
})

app.get('/login', function(request, response){
    const model = {}

    response.render("login.hbs", model)
})

app.get('/blogpost', function(request, response){

    const isLoggedIn = request.session.loggedin

    db.getAllBlogPosts(function(error, blog) {

            const model = {
                loggedin : isLoggedIn,
                blogpost : blog
            }
            response.render("blogpost.hbs", model)
        })
})


app.get('/newblogpost', function(request, response){

    const isLoggedIn = request.session.loggedin

    const model = {
        loggedin : isLoggedIn
    }

    response.render("newblogpost.hbs", model)
})

app.get('/gallery', function(request, response){
    const isLoggedIn = request.session.loggedin
    db.getAllGalleryEntries(function(error, gallery){
    const model = {
        gallery : gallery,
        loggedin : isLoggedIn
    }
    response.render("gallery.hbs", model)
    })
})

app.get('/admin', function(request, response){
    const isLoggedIn = request.session.loggedin

    const model = {
        loggedin : isLoggedIn
    }

    if(request.session.loggedin) {
        response.render("admin.hbs",model)
    }else{
        response.render("login.hbs", {})
    }

    response.render("admin.hbs", model)
})

app.get('/guestBookEntryMade', function(request, response){
    const isLoggedIn = request.session.loggedin

    const model = {
        loggedin : isLoggedIn
    }

    response.render("guestBookEntryMade.hbs", model)
})

app.get('/guestbook', function(request, response){

    const isLoggedIn = request.session.loggedin

    db.getAllGuestbookEntries(function(error, guestbook) {
            const model = {
                loggedin : isLoggedIn ,
                gbook : guestbook
            }
            response.render("guestbook.hbs", model)
        })
    }) 

app.get('/deleteBlogpost', function(error, response) {
    const isLoggedIn = request.session.loggedin
    db.getAllBlogPosts(function(error, blog) {

        const model = {
            blogpost : blog,
            loggedin : isLoggedIn
        }
        response.render("deleteBlogpost.hbs", model)
    })
})

app.post('/updateblog/:id', function(request, response) {

    const Id = request.params.id
    const Title = request.body.titleblogpost
    const Content = request.body.contentblogpost
    db.updateBlog(Id, Title, Content, function() {})
    
    response.redirect('/blogpost')
})

app.post('/delbp/:id', function(request, response) {
    
        const id = request.params.id
        
        db.deleteBlogpost(id, function() {})
        response.redirect('/blogpost')
})

app.get('/editbp/:id', function(request, response) {

    const Id = request.params.id
    const IsloggedIn = request.session.loggedin

    db.getBlogFromBlog(Id, function(error, blog) {
        const model = {
            blogpost : blog ,
            loggedin : IsloggedIn
        }
        response.render("editBlogpost.hbs", model)
    })  
})

app.post('/delgallery/:id', function(request, response) {

    const id = request.params.id
    db.deleteGalleryEntry(id, function(){})
    response.redirect('/gallery')
})

app.post('/delg/:id', function(request, response){

    const id = request.params.id
    db.deleteGuestbookEntry(id, function(){})
    response.redirect('/guestbook')
})

app.get('/newGalleryEntry', function(request, response){
    const isLoggedIn = request.session.loggedin
    
    const model = {
            loggedin : isLoggedIn
    }

    response.render("newGalleryEntry.hbs", model)
})

app.post('/submitBlogpost', function(request,response){

    const Author = "Oskar"
    const Title = request.body.title
    const Content = request.body.blogpost

    db.newBlogpost(Author, Title, Content, function() {
            
        })    
    response.redirect('/blogpost')
    
})

app.post('/galleryEntry', function(request, response){

    if (!request.files)
    return res.status(400).send('No files were uploaded.');

    let Image = request.files.file;

    let fileName = request.files.file.name

    Image.mv('./images/'+fileName, function(err) {
        if (err)
          return response.status(500).send(err);

    db.newGalleryEntry(fileName, function() {

    })
            response.redirect('/gallery')
})
})

app.post('/guestbookEntry', function(request, response){

    const Author = request.body.author
    const Message = request.body.message

    db.newGuestbookEntry(Author, Message, function() {})
            response.redirect('guestbook')
    })

app.post('/login', function(request, response){
    const email = request.body.em
    const password = request.body.pw

    if( db.authorize(email, password, function() {}) ) {   
        request.session.loggedin = true
        response.redirect('/admin')
    }else{
       response.render("login.hbs") 
    }
})

app.post('/logout', function(request, response) {

    request.session.loggedin = false
    response.redirect('/home')
})

app.listen(8080)