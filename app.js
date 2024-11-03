import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';


var app = express();


// fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// setup view engine
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');


// setup middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));


// setup routes
import indexRouter from './routes/index.js';
import aboutRouter from './routes/about.js';
import cartRouter from './routes/cart.js';
import productsRouter from './routes/products.js';
import contactRouter from './routes/contact.js';

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/contact', contactRouter);


// setup error handlers middleware
app.use(function(req, res, next) {
	next(createError(404));
});
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


// export app
export const set = app.set.bind(app);
export default app;
