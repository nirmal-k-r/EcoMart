const express = require('express');
const Product = require('../models/products');
const router = express.Router();

router.get('/', async (req, res) => {
    products = await Product.find({}); //get all products from database
    ctx = {
        products: products
    }

    res.render('admin/dashboard', ctx);
});


router.post('/products', (req, res) => {
    console.log(req.body);
    // Logic to add a new product would go here
    name=req.body.name;
    price=req.body.price;
    category=req.body.category;
    description=req.body.description;
    image=req.body.image;
    stock=req.body.stock;

    newProduct=new Product({
        name: name,
        price: price,
        category: category,
        description: description,
        image: image,
        stock: stock
    });

    newProduct.save()
    .then(()=>{
        console.log('Product added successfully');
    })
    .catch((err)=>{
        console.log('Error adding product:', err);
    }); 

    res.redirect('/admin');
});


//delete product route
router.get('/products/delete/:id', async (req, res) => {
    const productId=req.params.id;

    try {
        await Product.findByIdAndDelete(productId);
        console.log('Product deleted successfully');
    } catch (err) {
        console.log('Error deleting product:', err);
    }

    res.redirect('/admin');
});


router.get('/products/update/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    ctx = {
        product: product
    }

    res.render('admin/updateProduct', ctx);
});

router.post('/products/update/:id', async (req, res) => {
    const productId = req.params.id;
    
    const updatedData = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        stock: req.body.stock,
        image: req.body.image
    };
    
    try {
        await Product.findByIdAndUpdate(productId, updatedData);
        console.log('Product updated successfully');
    } catch (err) {
        console.log('Error updating product:', err);
    }

    res.redirect('/admin');
});


module.exports = router;