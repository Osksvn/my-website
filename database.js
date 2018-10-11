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
    const query = 
})