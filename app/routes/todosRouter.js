const express = require("express")
const jwt = require('jsonwebtoken')
const Router = express.Router()

const Todos = require("../controllers/todosController")


console.log('In todosRouter.js')

// reading  todo items for date selected for specific user data
Router.post("/read", authenticateToken, Todos.ReadToDoItemsForDateSelected)
// post todo item in database
Router.post("/write", authenticateToken, Todos.WriteToDoItem)
// update done state of todo item in database
Router.post("/updateDoneState", authenticateToken, Todos.UpdateDoneState)
// delete item in database
Router.post("/deleteItem", authenticateToken, Todos.DeleteItem)
//Reading all todo items for a spefic user
Router.post("/readAllItemsForUser", authenticateToken, Todos.ReadToDoItemsForUser)

//function to authenticate the user request
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