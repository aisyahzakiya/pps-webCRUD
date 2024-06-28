import express from "express";
import cors from "cors";
// import UserRoute from "./app/v1/User/route.js";
import UserRoute from "./app/v1/Users/route.js";
import ProductsRoute from "./app/v1/Products/route.js";
import AuthRoute from "./app/v1/Auth/route.js";

// import database otomatis
import db from "./config/Database.js";

import session from "express-session";
import dotenv from "dotenv";

dotenv.config();


const app = express();
//menambahkan tabel sinkronisasi database
(async()=>{
    await db.sync();   
   })(); 

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // http = false, https = true
        // set otomatis
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    // domain agar dapat mengakses API kita
    origin: ['http://localhost:3000']
}));

// agar dapat menerima json
app.use(express.json());

app.use(UserRoute);
app.use(ProductsRoute);
app.use(AuthRoute);



app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running.. :)');
});