const jwt = require('jsonwebtoken')

console.log('In UsersController.js')

const dbconnection = require("../models/db")
const bcrypt = require("bcrypt")
const saltRounds = 10

exports.ReadAll = (req, res) => {
    console.log("Hi")
    res.status(200).send({list: 'Check out later'})
}