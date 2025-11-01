const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    res.redirect('/auth/login');
});



router.get('/login', async (req, res) => {
    ctx={
        title: 'Ecomart - Login'
    }
    res.render('auth/login', ctx);
})

router.get('/register', async (req, res) => {
    if (req.query.message==='error'){
        var message='Error registering user. Please try again.';
    } else {
        var message="none";
    }
    ctx={
        title: 'Ecomart - Register',
        message: message
    }
    res.render('auth/register', ctx);
})

router.post('/register', async (req, res) => {
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    //hash the password 
    const saltRounds=10;
    const salt=await bcrypt.genSalt(saltRounds);
    const hashedPassword=await bcrypt.hash(password, salt);
    hash=hashedPassword;

    //generate token
    token_material=email+ Date.now().toString();
    const token=await bcrypt.hash(token_material, salt);


    //create new user object
    const newUser=new User({
        name: name,
        email: email,
        token: token,
        role: 'user',
        password: hash
    });



    //save user to database
    newUser.save()
    .then(()=>{
        console.log('User registered successfully');
        
        //create session without password
        req.session.user={
            name: newUser.name,
            email: newUser.email,
            token: newUser.token,
            role: newUser.role
        };

        res.redirect('/');
    })
    .catch((err)=>{
        console.log('Error registering user:', err);
        res.redirect('/auth/register?message=error');
    });

});

router.post('/login', async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;

    //find user by email
    const user=await User.findOne({ email: email });
    if (!user){
        console.log('User not found');
        return res.redirect('/auth/login?message=error');
    }

    //compare password
    const isMatch=await bcrypt.compare(password, user.password);
    if (!isMatch){
        console.log('Invalid password');
        return  res.redirect('/auth/login?message=error');
    }

    //create session
    req.session.user={
        name: user.name,
        email: user.email,
        token: user.token,
        role: user.role
    };

    res.redirect('/');
});

router.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
        }
        res.redirect('/auth/login');
    });
});

module.exports = router;
