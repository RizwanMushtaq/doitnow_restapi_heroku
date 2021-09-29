const dbconnection = require("../models/db")
const bcrypt = require("bcrypt")
const saltRounds = 10

console.log('In UserModel.js')

const Users = {}

Users.getAll = (result) => {
    dbconnection.setupConnection.query("SELECT * from users", 
    (err, rows, fields)=> {
        if(err){
            console.log(err)
            result(err, null)
            return
        }
        if(!rows.length){
            console.log('Data not found')
            result(null, { error: 'Data not found'})
            return
        }
        
        console.log(rows)
        console.log(typeof(rows))
        result(null, rows)
    })
}


Users.add = (user, result) => {

    //First check if user with the name already exits in database
    dbconnection.setupConnection.query("SELECT * FROM users WHERE User = ?", [user.username], 
    (err, rows, fields) =>{
        if(err){
            console.log(err)
            result(err, null)
            return
        }
        if(!rows.length){
            //No user found So add user record in DB
            bcrypt.hash(user.password, saltRounds, (err, hash)=>{
                if(err){
                    console.log(err)
                    return
                }
                console.log(hash)
                dbconnection.setupConnection.query("INSERT INTO users SET ?", {User:user.username, EMail: user.email, Password: hash}, 
                    (err, rows, fields) =>{
                        if(err){
                            result(err, null)
                            return
                        }
        
                        console.log(JSON.stringify(rows))
                        // result(null, { success: 'user added at id = ' + rows.insertId})
                        result(null, '01') //01 means success, user is added in database
                })
            })
            
            return
        }
        //User name exit in DB
        console.log('user with username = ' + user.username + ' already exits. Try with new Username')
        result(null, '02') //02 means error, user already exits in database
        return
    })    
}

Users.changePassword = (user, result) => {

    bcrypt.hash(user.password, saltRounds, (err, hash)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(hash)
        dbconnection.setupConnection.query(
            "UPDATE users SET Password = ? WHERE User = ?", [hash, user.username], 
            (err, rows, fields) =>{
                if(err){
                    result(err, null)
                    return
                }
                if(rows.affectedRows === 0){
                    result(null, { error: 'user with username = ' + user.username + ' not found'})
                    return
                }
    
                console.log('user password with username = ' + user.username + ' is updated')
                result(null, { success: 'user password with username = ' + user.username + ' is updated'})
        })

    })
}


Users.matchPassword = (user, result) => {

    dbconnection.setupConnection.query("SELECT * FROM users WHERE User = ?", [user.username], 
    (err, rows, fields) =>{
        if(err){
            console.log(err)
            result(err, null)
            return
        }

        if(!rows.length){
            console.log('user with username = ' + user.username + ' not found')
            
            return result(err, null)
        }

        console.log(typeof(rows))
        console.log(rows.length)
        console.log(rows[0].Password)

        bcrypt.compare(user.password, rows[0].Password, (err, res)=>{
            if(res){
                console.log('correct password')
                result(null, res)
                return
            }
            console.log('wrong Password')
            result(null, res)
        })
    })
}




module.exports = Users