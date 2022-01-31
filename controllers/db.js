import mysql from 'mysql2'

const mySQLConfig = {
    host: 'userdatabase.clv8u6q2qugn.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    database: 'users',
    connectionLimit: 10
}

let connection = mysql.createPool(mySQLConfig);

export default connection
