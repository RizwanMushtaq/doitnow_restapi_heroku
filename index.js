const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
//importing Routes
const usersRoutes = require("./app/routes/usersRouter")
const todosRoutes = require("./app/routes/todosRouter")

const port = process.env.PORT || 8090 ;

console.log('In Index.js')

const app = express();
app.use(cors());
app.use(express.json())

// parse requests of content-type: application/json
app.use(bodyParser.json());

//Forward all routes 
app.use("/users", usersRoutes)
// app.use("/todos", todosRoutes)

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Do IT Now Rest API - Node.JS Express Server And MySQL" });
    res.end()
});

// set port, listen for requests
app.listen(port, () => {
    console.log("Server is running on port 8090.");
});