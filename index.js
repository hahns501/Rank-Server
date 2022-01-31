// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors'
// import dotenv from 'dotenv';
// import mysql from 'mysql2';
//
// const app = express();
//
// import productRoutes from './routes/product.js';
// import userRoutes from './routes/user.js';
// import activeUserRoutes from './routes/activeUser.js';
//
//
// dotenv.config();
//
// app.use(bodyParser.json({limit: "30mb", extended: true}));
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
// app.use(cors());
//
// app.use('/products', productRoutes);
// app.use('/users', userRoutes);
// app.use('/activeUsers', activeUserRoutes);
//
// app.get('/', (req,res) =>{
//     res.send('Hello Pizza Gang');
// });
//
// const PORT = process.env.PORT || 5000;
//
// mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//     .catch((error) => console.log(error.message))
//
// mongoose.set('useFindAndModify', false);

import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';

import connection from './controllers/db.js'

// let connection = mysql.createConnection({
//     host: 'userdatabase.clv8u6q2qugn.us-east-2.rds.amazonaws.com',
//     user: 'admin',
//     password: 'password',
//     database: 'users',
//     port: 3306
// })

const app = express()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Server running on port: ${PORT} `);
    console.log(`Go to http://localhost:${PORT}`)
});

app.get('/', (req,res) =>{
    res.send('Server is running');
});

app.get('/test', (req,res) =>{
    res.send('Test');
    console.log("temp");

});

// app.get('/test', (req,res) =>{
//     res.send('Ayo Test');
//
//     let q = 'select * from user'
//     connection.query(q, function (err,results, fields) {
//         console.log(results);
//
//     })
// });

app.use('/users', userRoutes);

