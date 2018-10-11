const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('DB/websiteDB.db')

db.run('CREATE TABLE IF NOT EXISTS blog(id integer primary key autoincrement, author text, title text, content text)', function(error) {
    if(error) {
        console.log("error")
    }else{
        console.log("succesfully created blog table")
    }
})

db.run('CREATE TABLE IF NOT EXISTS admin(id integer primary key autoincrement, email text unique, password text unique)', function(error) {
    if(error) {
        console.log("error")
    }else{
        console.log("succesfully created user table")
    }
})

db.run('CREATE TABLE IF NOT EXISTS portfolio(id integer primary key autoincrement, title text, content text, image text)', function(error) {
    if(error) {
        console.log("error")
    }else{
        console.log("succesfully created portfolio table")
    }
})

db.run('CREATE TABLE IF NOT EXISTS guestbook(id integer primary key autoincrement, author text, message text)', function(error){
    if(error) {
        console.logt("error")
    }else{
        console.log("succesfully created guestbook table")
    }
})

exports.getAllBlogPosts = function(callback) {
    const query = 'SELECT * FROM blog'
    db.all(query, function(error, blog){
        callback(error, blog)
    })
}

exports.newBlogpost = function(Author, Title, Content) {

    const query = "INSERT INTO blog(author, title, content) VALUES (?,?,?)"
    db.run(query,[Author, Title, Content] , function(error){
        if(error){
        console.log("couldnt post")
        }else{
            console.log("succesfully inserted into blog")
        }
    })
}

exports.newPortfolioEntry = function(Title, Content, Image) {

    const query = "INSERT INTO portfolio(title, content, image) VALUES (?,?,?)"
    db.run(query, [Title, Content, Image], function(error){
        if(error){
            console.log("coulndt post into portfolio database")
        }else{
            console.log("succesfully inserted into portfolio")
        }
    })
}

exports.getAllPortfolioEntries = function(callback) {
    const query = 'SELECT * FROM portfolio'
    db.all(query, function(error, portfolio){
        callback(error, portfolio)
    })
}

exports.getAllGuestbookEntries = function(callback) {
    const query = 'SELECT * FROM guestbook'
    db.all(query, function(error, guestbook) {
        callback(error, guestbook)
    })
}

exports.newGuestbookEntry = function(Author, Message) {
    const query ="INSERT INTO guestbook(author, message) VALUES (?,?)"
    db.run(query, [Author, Message], function(error) {
        if(error){
            console.log("couldnt post into guestbook table")
        }else{
            console.log("succesfully inserted into guestbook")
    }
})
}