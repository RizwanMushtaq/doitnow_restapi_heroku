require('dotenv').config()

const Users = require("../models/usersModel")
const jwt = require('jsonwebtoken')

console.log('In UsersController.js')

const dbconnection = require("../models/db")
const bcrypt = require("bcrypt")
const saltRounds = 10

exports.ReadAll = (req, res) => {
    Users.getAll((err, data) => {
        if(err){
            res.send(err)
        }
        
        res.send(data)
    })
}

exports.insert = (req, res) => {
    console.log(req.body)

    Users.add(req.body, (err, data) => {
        if(err){
            res.send(err)
            return
        }

        res.send(data)
    })

}

exports.updatePassword = (req, res) => {
    Users.changePassword(req.body, (err, data) => {
        if(err){
            res.send(err)
            return
        }

        res.send(data)
    })
}

exports.VerifyPassword = async (req, res) => {

    dbconnection.setupConnection.query("SELECT * FROM users WHERE User = ?", [req.body.username], 
    (err, rows, fields) =>{
        if(err){
            console.log(err)
            result(err, null)
            return
        }

        if(!rows.length){
            console.log('user with username = ' + req.body.username + ' not found')
            res.status(400).send()
            return
        }

        console.log(typeof(rows))
        console.log(rows.length)
        console.log(rows[0].Password)
        
        bcrypt.compare(req.body.password, rows[0].Password, (error, response)=>{
            if(response){
                const username = req.body.username
                const user = {name: username}
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                
                console.log(accessToken)
                console.log('correct password')
                res.status(200).send(
                    {
                        accessToken: accessToken,
                        userName: rows[0].User,
                        userID: rows[0].U_ID,
                        userEMail: rows[0].EMail
                    }
                )
                return
            }

            console.log('wrong Password')
            res.status(400).send()
            return
        })
    })

}