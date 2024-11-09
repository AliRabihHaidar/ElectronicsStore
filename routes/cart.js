import express from 'express';
import { addProductToCart, getCart, removeProductFromCart } from '../db/db_utils.js';
var cartRouter = express.Router();

/* GET users listing. */
cartRouter.get('/', async function(req, res, next) {
    // get cart details
    const username = req.user.username;
    try {
        const { products, cartSize } = await getCart(username);
        res.render('cart', { title: 'Your Cart', products: products, cartSize: cartSize });
    } catch (error) {
        console.error('Error fetching products:', error);
        next(error);
    }
});

cartRouter.get('/get-cart-size', function(req, res, next) {
    const username = req.user.username;
    getCart(username)
        .then(cart => {
            res.json({ cartSize: cart.cartSize });
        })
        .catch(error => {
            console.error('Error fetching cart size:', error);
            next(error);
        });
})

cartRouter.post('/add-to-cart', function(req, res, next) {
    const product_id = req.body.product_id;
    const username = req.user.username;
    addProductToCart(product_id, username);
    res.json({ message: `Product ${product_id} added to cart` });
})

cartRouter.post('/remove-from-cart', function(req, res, next) {
    const product_id = req.body.product_id;
    const username = req.user.username;
    removeProductFromCart(product_id, username);
    res.json({ message: `Product ${product_id} removed from cart` });
})

export default cartRouter;
