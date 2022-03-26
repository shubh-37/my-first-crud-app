const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const connectDB = require('./server/database/connection');
dotenv.config({path: 'config.env'});

const port = process.env.PORT || 3000;

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse requests to body-parser
app.use(bodyParser.urlencoded({
    extended:true
}));

//set view engine
app.set('view engine','ejs');

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")));
app.use('/js', express.static(path.resolve(__dirname,"assets/js")));
app.use('/img', express.static(path.resolve(__dirname,"assets/img")));

//load routers
app.use('/',require('./server/routes/router'));
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});