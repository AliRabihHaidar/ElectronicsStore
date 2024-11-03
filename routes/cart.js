import express from 'express';
var cartRouter = express.Router();

/* GET users listing. */
cartRouter.get('/', function(req, res, next) {
    res.render('cart', { title: 'Express' });
});

export default cartRouter;
