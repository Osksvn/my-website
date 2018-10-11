

const dummyData = require('./dummy-data')
const express = require('express')
const db = require('./database')




const bodyParser = require('body-parser')

const expressHandlebars =
 require('express-handlebars')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))

app.engine('hbs', expressHandlebars({
 defaultLayout: 'main',
 extname: '.hbs'
}))

app.use(express.static('images'))

app.get('/home', function(request, response){
 const model = {
 // humans: dummyData.humans
 }

 response.render("home.hbs", model)
})

app.get('/contact', function(request, response){
    const model = {}

    response.render("contact.hbs", model)
})

app.get('/about', function(request, response){
    const model = {}

    response.render("about.hbs", model)
})

app.get('/login', function(request, response){
    const model = {}

    response.render("login.hbs", model)
})

app.get('/blogpost', function(request, response){

    db.getAllBlogPosts(function(error, blog) {

            const model = {
                blogpost : blog
            }
            response.render("blogpost.hbs", model)
        })
})

app.get('/newblogpost', function(request, response){

    const model = {}

    response.render("newblogpost.hbs", model)
})

app.get('/portfolio', function(request, response){

    db.getAllPortfolioEntries(function(error, portfolio){
    const model = {
        pfolio : portfolio
    }
    response.render("portfolio.hbs", model)
    })
})

app.get('/admin', function(request, response){
    const model = {}

    response.render("admin.hbs", model)
})

app.get('/guestBookEntryMade', function(request, response){
    const model = {}

    response.render("guestBookEntryMade.hbs", model)
})

app.get('/guestbook', function(request, response){

    db.getAllGuestbookEntries(function(error, guestbook) {
            const model = {
                gbook : guestbook
            }
            response.render("guestbook.hbs", model)
        })
    }) 

app.get('/newPortfolioEntry', function(request, response){
    const model = {}

    response.render("newPortfolioEntry.hbs", model)
})

app.post('/submitBlogpost', function(request,response){

    const Author = "Oskar"
    const Title = request.body.title
    const Content = request.body.blogpost

    db.newBlogpost(Author, Title, Content, function() {
            
        })    
    response.render("admin.hbs", {})
    
})

app.post('/portfolioEntry', function(request, response){

    const Title = request.body.ptitle
    const Content = request.body.pentry
    const Image = request.body.pimage

    db.newPortfolioEntry(Title, Content, Image, function() {

    })
            response.render("admin.hbs", {})
})

app.post('/guestbookEntry', function(request, response){

    const Author = request.body.author
    const Message = request.body.message

    db.newGuestbookEntry(Author, Message, function() {})
            response.render("guestBookEntryMade.hbs", {})
    })

app.post('/login', function(request, response){
    const email = request.body.em
    const password = request.body.pw

    if(email == "osksvn@outlook.com" && password == "Password1"){
        request.session.loggedin = true
        response.render("/home")
    }else{
        response.render("login.hbs")
    }
})


app.listen(8080)