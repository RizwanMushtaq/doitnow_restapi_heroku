const jwt = require('jsonwebtoken')

console.log('In UsersController.js')

const dbconnection = require("../models/db")
const bcrypt = require("bcryptjs")
const saltRounds = 10

exports.ReadToDoItemsForDateSelected = (req, res) => {
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

exports.UpdateDoneState = (req, res) => {
    console.log("In user Controller UpdateDoneState function")

    let state = req.body.state
    let itemId = req.body.itemId

    dbconnection.setupConnection.query("UPDATE todos SET Done = ? WHERE Item_ID = ?", [state ,itemId], 
        (err, rows, fields) =>{
            if(err){
                res.status(400).send()
                return
            }

            res.status(200).send({result: 'success'})
    })

}

exports.DeleteItem = (req, res) => {
    console.log("In user Controller DeleteItem function")

    let itemId = req.body.itemId

    dbconnection.setupConnection.query("DELETE FROM todos WHERE Item_ID = ?", [itemId], 
        (err, rows, fields) =>{
            if(err){
                res.status(400).send()
                return
            }

            res.status(200).send({result: 'success'})
    })
}

exports.ReadToDoItemsForUser = (req, res) => {
    console.log("In user Controller ReadToDoItemsForUser function")

    let userID = req.body.userID

    dbconnection.setupConnection.query("SELECT * FROM todos WHERE B_ID = ?", [userID],
        (err, rows, fields) => {
            if(err){
                console.log(err)
                res.status(400).send()
                return
            }
            if(!rows.length){
                console.log('No data found for selected user')
                res.status(200).send({})
                return
            }

            console.log(rows)
            res.status(200).send({"ToDoList": rows})
        }
    )
}