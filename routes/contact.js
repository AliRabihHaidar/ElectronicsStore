import express from 'express';
import { save_message } from '../db/db_utils.js';


var contactRouter = express.Router();

contactRouter.get('/', function(req, res, next) {
	res.render('contact', { title: 'Express' });
});


// Route to handle contact form submission
contactRouter.post('/send-message', async function (req, res) {
    const { name, email, message } = req.body;
    // Save the message in the database
    const username = req.user.username;
    await save_message(username, name, email, message)
    res.render('contact', { title: 'Express' });
});

export default contactRouter;
