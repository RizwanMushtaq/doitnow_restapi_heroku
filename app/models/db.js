const mysql = require("mysql");
const dbConfig = require("../config/db_config.js");

// Create a connection to the database
const setupConnection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true
});

console.log('In db.js')

// // open the MySQL connection
// const startConnection = setupConnection.connect( (error) => {
//                 if (error) {
//                     console.log("Connection Error");
//                     console.log(error);
//                 } else {
//                     console.log("Successfully connected to the database.");
//                 }
                
//             });

module.exports = {
    // startConnection,
    setupConnection
};