//imports
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const db= require('./db'); //database connection
const bcrypt = require('bcrypt');
const session = require('express-session');

//import routers
const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');


// create our express application
const app = express();


//set view engine
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

//set static folder
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

//middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' })); //to parse URL-encoded bodies
app.use(bodyParser.json({ limit: '25mb' }));  //to parse JSON bodies

//set session middleware
app.use(session({
    secret: 'y673dbzeh@%^tgdvxc',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 } //cookie will last for 1 month
}));

app.use((req, res, next) => {
  res.locals.user = req.session?.user || null; // expose only what you need
  next();
});


//logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});


//use routers (link our routers to our app)
app.use('', productRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);



//error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// //404 handler
// app.use((req, res, next) => {
//     res.status(404).send('Sorry, we could not find that!');
// });

//Start the server
const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});