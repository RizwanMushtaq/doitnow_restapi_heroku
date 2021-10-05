const jwt = require('jsonwebtoken')

console.log('In UsersController.js')

const dbconnection = require("../models/db")
const bcrypt = require("bcrypt")
const saltRounds = 10

exports.ReadToDoItems = (req, res) => {
    console.log("In User Controller ReadToDoItems")

    let userID = req.body.userID
    let selectedDate = req.body.selectedDate

    dbconnection.setupConnection.query("SELECT * FROM todos WHERE B_ID = ? AND Date = ?", [userID, selectedDate],
        (err, rows, fields) => {
            if(err){
                console.log(err)
                res.status(400).send()
                return
            }
            if(!rows.length){
                console.log('No data found for selected date and user')
                res.status(200).send({})
                return
            }

            console.log(rows)
            res.status(200).send({"ToDoList": rows})
        }
    )
}
exports.WriteToDoItem = (req, res) => {
    console.log("In User Controller WriteToDoItem")

    let userID = req.body.userID
    let toDoItem = req.body.toDoItem
    let selectedDate = req.body.selectedDate
    let done = req.body.done

    console.log(userID)
    console.log(toDoItem)
    console.log(selectedDate)
    console.log(done)

    dbconnection.setupConnection.query("INSERT INTO todos SET ?", {B_ID:userID, Todo: toDoItem, Date: selectedDate, Done: done}, 
        (err, rows, fields) =>{
            if(err){
                res.status(400).send()
                return
            }

            res.status(200).send({result: 'success'})
    })

}