require('dotenv').config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require('./db/conn');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : false}));
app.use(require('./router/routes'));
const port = process.env.PORT || 8000;






app.listen(port,() => {
    console.log("Listening to port "+port);
})