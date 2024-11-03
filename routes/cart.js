import express from 'express';
import { addProductToCart, getCart, removeProductFromCart } from '../db/db_utils.js';
var cartRouter = express.Router();

/* GET users listing. */
cartRouter.get('/', async function(req, res, next) {
    // get cart details
    const user_id = 3;
    try {
        const products = await getCart(user_id);
        res.render('cart', { title: 'Your Cart', products: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        next(error);
    }
});

cartRouter.post('/add-to-cart', function(req, res, next) {
    const product_id = req.body.product_id;
    const user_id = 3;
    addProductToCart(product_id, user_id);
    res.json({ message: `Product ${product_id} added to cart` });
})

cartRouter.post('/remove-from-cart', function(req, res, next) {
    const product_id = req.body.product_id;
    const user_id = 3;
    removeProductFromCart(product_id, user_id);
    res.json({ message: `Product ${product_id} removed from cart` });
})

export default cartRouter;
