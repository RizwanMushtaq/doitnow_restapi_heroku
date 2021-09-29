const express = require("express")
const jwt = require('jsonwebtoken')
const Router = express.Router()

const Todos = require("../controllers/todosController")


console.log('In todosRouter.js')

// reading  all data
Router.get("/", authenticateToken, Todos.ReadAll)



function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = Router