

const dummyData = require('./dummy-data')
const express = require('express')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('DB/websiteDB.db')

db.run('CREATE TABLE IF NOT EXISTS blog(id integer primary key autoincrement, author text, title text, content text)', function(error) {
    if(error) {
        console.log("suck ass")
    }else{
        console.log("succesfully created")
    }
})

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
    const model = {}

    response.render("blogpost.hbs", model)
})

app.get('/newblogpost', function(request, response){

    const model = {}

    response.render("newblogpost.hbs", model)
})

app.post('/submitBlogpost', function(request,response){


    const Author = "Oskar"
    const Title = request.body.title
    const Content = request.body.blogpost
    const query = "INSERT INTO blog(author, title, content) VALUES (?,?,?)"
    db.run(query,[Author, Title, Content] , function(error){
        if(error){
        console.log("couldnt post")
        }else{
            console.log("succesfully inserted into table")
        }
    })
})



app.listen(8080)