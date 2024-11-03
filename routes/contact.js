import express from 'express';
var contactRouter = express.Router();

/* GET users listing. */
contactRouter.get('/', function(req, res, next) {
	res.render('contact', { title: 'Express' });
});

export default contactRouter;
