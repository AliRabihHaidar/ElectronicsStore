import express from 'express';
var productsRouter = express.Router();

/* GET users listing. */
productsRouter.get('/', function(req, res, next) {
    res.render('products', { title: 'Express' });
});

export default productsRouter;
