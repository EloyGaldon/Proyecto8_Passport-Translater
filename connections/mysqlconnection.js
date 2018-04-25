
const MYSQL= require('mysql');
const CONN = MYSQL.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'travel_agency'
});

module.exports = CONN;
