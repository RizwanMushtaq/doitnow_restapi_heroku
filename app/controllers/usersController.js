const Users = require("../models/usersModel")

console.log('In UsersController.js')

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

exports.VerifyPassword = (req, res) => {
    Users.matchPassword(req.body, (err, data) => {
        if(err){
            res.send(err)
        }

        res.send(data)
    })
}