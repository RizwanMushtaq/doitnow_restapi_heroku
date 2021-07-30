const express = require("express")
const Router = express.Router()

const Users = require("../controllers/usersController")


console.log('In UserRouter.js')


//Insert User data
// Router.post("/", Users.insert)

// reading  all data
Router.get("/", Users.ReadAll)
//Insert User data
Router.post("/", Users.insert)
//Update User Password with specific username
Router.put("/", Users.updatePassword)
//Verify User Password
Router.post("/verify", Users.VerifyPassword)


module.exports = Router