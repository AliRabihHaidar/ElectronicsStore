import express from 'express';
var aboutRouter = express.Router();

/* GET users listing. */
aboutRouter.get('/', function(req, res, next) {
	res.render('about');
});

export default aboutRouter;
