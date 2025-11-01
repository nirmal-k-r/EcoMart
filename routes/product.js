const express = require('express');
const router = express.Router();
const Product = require('../models/products');


router.get('/', async (req, res) => {
    if (req.session.user){
        const products = await Product.find({});
        ctx={
            title: 'Ecomart - Home',
            products: products
        }
        res.render('product/home', ctx);
    } else {
        res.redirect('/auth/login');
    }
});

router.get('/products/search', async (req, res) => {
    const query = req.query.query;
    //if no query or empty query, return all products
    if (!query || query.trim() == '') {
        products = await Product.find({});
    } else {
        products = await Product.find({ name: { $regex: query, $options: 'i' } });
    }
    ctx={
        title: `Search results for "${query}"`,
        products: products
    }
    res.json(ctx);
});

router.get('/about', async (req, res) => {
    ctx={
        title: 'Ecomart',
        description: 'Your one-stop shop for all things eco-friendly. At Ecomart, we are committed to providing sustainable and environmentally friendly products that help you make a positive impact on the planet. From reusable household items to organic personal care products, we have everything you need to live a greener lifestyle. Join us in our mission to create a better world, one purchase at a time.'
    }
    res.render('product/about', ctx);
})

module.exports = router;
