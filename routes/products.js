import express from 'express';
import { getProducts } from '../db/db_utils.js';

const productsRouter = express.Router();

productsRouter.get('/', async function(req, res, next) {
    try {
    const products = await getProducts();
    res.render('products', { title: 'Products', products: products });
    } catch (error) {
    console.error('Error fetching products:', error);
    next(error);
    }
});

export default productsRouter;