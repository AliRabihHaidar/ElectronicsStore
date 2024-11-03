import express from 'express';
var aboutRouter = express.Router();

/* GET users listing. */
aboutRouter.get('/', function(req, res, next) {
	res.render('about', { title: 'Express' });
});

export default aboutRouter;
