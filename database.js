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
        console.log("succesfully created admin table")
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

db.run('CREATE TABLE IF NOT EXISTS gallery(id integer primary key autoincrement, image text)', function(error){
    if(error) {
        console.logt("error")
    }else{
        console.log("succesfully created gallery table")
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

exports.newGalleryEntry = function(FileName) {

    const query = "INSERT INTO gallery(image) VALUES (?)"
    db.run(query, [FileName], function(error){
        if(error){
            console.log("coulndt post into portfolio database")
        }else{
            console.log("succesfully inserted into portfolio")
        }
    })
}

exports.getAllGalleryEntries = function(callback) {
    const query = 'SELECT * FROM gallery'
    db.all(query, function(error, gallery){
        callback(error, gallery)
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

exports.deleteBlogpost = function(id) {
    const query = "DELETE FROM blog WHERE id = ?"
    db.run(query, [id], function(error) {
        if(error){
            console.log("couldnt delete from blogposts")
        }else{
            console.log("succesfully deleted from blogposts")
            const numberOfDeletedRows = this.changes
            
        }
    })
}

exports.deleteGalleryEntry = function(id) {
    const query = "DELETE FROM gallery WHERE id = ?"
    db.run(query, [id], function(error) {
        if(error){
            console.log("couldnt delete from gallery")
        }else{
            console.log("succesfully deleted from gallery")
        }
    })
}

exports.deleteGuestbookEntry = function(id) {
    const query = "DELETE FROM guestbook WHERE id = ?"
    db.run(query, [id], function(error){
        if(error){
            console.log("couldnt delete from guestbook")
        }else{
            console.log("succesfully deleted from guestbook")
        }
    })
}


exports.updateBlog = function(id, title, content) {
    const query = 'UPDATE blog SET title = ?, content = ? WHERE id = ?'
    db.run(query, [title, content, id], function(error){
        if(error){
            console.log("couldnt update blogpost")
        }else{
            console.log("succesfully updated blog")
        }
    }) 
}
