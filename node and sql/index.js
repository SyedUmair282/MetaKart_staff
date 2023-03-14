
// const sql = require('mssql')
// const express = require('express')
// var config = {
//     user: "sa", //default is sa
//     password: "Dev@2022",
//     server: "192.168.1.101", // for local machine
//     database: "EcommerceTest", // name of database
//     options: {
//         encrypt: false //check later izhan
//     },
// }

// const appPool = new sql.ConnectionPool(config)
// const sqlRoutes = require("./routes/sqlRoutes")

// const app = express();
//  app.use(express.json())
//  app.use('/sql',sqlRoutes)

// console.log("Hello world, This is an app to connect to sql server.");


// appPool.connect().then(function(pool) {
//     app.locals.db = pool;
//     const server = app.listen(5000, function () {
//       const host = server.address().address
//       const port = server.address().port
//       console.log('Example app listening at http://%s:%s', host, port)
//     })
//   }).catch(function(err) {
//     console.error('Error creating connection pool', err)
//   });






// app.listen(process.env.PORT || 5000,()=>{
//             console.log("Backend server running!");
//         })



const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const sql = require('mssql')
var config = {
    user: "sa", //default is sa
    password: "Dev@2022",
    server: "192.168.1.100", // for local machine
    database: "EcommerceTest", // name of database
    options: {
        encrypt: false //check later izhan
    },
    pool: {
        max: 1000,
        min: 0,
        idleTimeoutMillis: 30000
    },
}
//instantiate a connection pool
const appPool = new sql.ConnectionPool(config)
//require route handlers and use the same connection pool everywhere
const dashboardRoutes = require('./routes/dashboardRoutes')
const orderRoutes=require('./routes/ordersRoutes')
const loginRoutes = require('./routes/loginRoutes')
dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())
app.use('/dashboard', dashboardRoutes)
app.use('/order',orderRoutes);
app.use('/login', loginRoutes)


//connect the pool and start the web server when done
appPool.connect().then(function (pool) {
    app.locals.db = pool;
    const server = app.listen(5000, function () {
        const host = server.address().address
        const port = server.address().port
        console.log('Example app listening at http://%s:%s', host, port)
    })
}).catch(function (err) {
    console.error('Error creating connection pool', err)
});