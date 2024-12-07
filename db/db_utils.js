// db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function query(sql, params) {
    const [results] = await pool.execute(sql, params);
    return results;
}

export async function getProducts() {
    return query('SELECT * FROM product');
}

export async function getCart(username) {
    // join cart_item, cart, and product tables to get each selected product info with its quantity
    const rows = await query(`
        SELECT product.product_id, product.product_name, product.price, product.description, COUNT(cart_item.cart_id) AS quantity
        FROM cart_item
        JOIN cart ON cart_item.cart_id = cart.cart_id
        JOIN user ON cart.user_id = user.user_id
        JOIN product ON cart_item.product_id = product.product_id
        WHERE user.username = ?
        GROUP BY product.product_id
    `, [username]);

    const cartSize = rows.reduce((sum, row) => sum + row.quantity, 0);
    return { products: rows, cartSize };
}

export async function addProductToCart(product_id, username) {
    const rows = await query('SELECT cart_id FROM cart JOIN user ON cart.user_id = user.user_id WHERE username = ?', [username]);
    if (rows.length === 0) {
        const user_id = (await query('SELECT user_id FROM user WHERE username = ?', [username]))[0].user_id;
        // create new cart if user doesn't have one
        await query('INSERT INTO cart (user_id) VALUES (?)', [user_id]);
        rows = (await query('SELECT cart_id FROM cart JOIN user ON cart.user_id = user.user_id WHERE username = ?', [username]));
    }
    const cart_id = rows[0].cart_id;
    
    await query('INSERT INTO cart_item (cart_id, product_id) VALUES (?, ?)', [cart_id, product_id]);
}

export async function removeProductFromCart(product_id, username) {
    const rows = (await query('SELECT cart_id FROM cart JOIN user ON cart.user_id = user.user_id WHERE username = ?', [username]));
    if (rows.length === 0) {
        // user doesn't have a cart, so nothing to remove
        return;
    }
    const cart_id = rows[0].cart_id;
    await query(
        `DELETE FROM cart_item
        WHERE cart_id = ? AND product_id = ?
        LIMIT 1`,
        [cart_id, product_id]
    );
}

export async function save_message(username, name, email, message) {
    const user_id = (await query('SELECT user_id FROM user WHERE username = ?', [username]))[0].user_id;
    await query(`
        INSERT INTO message
            (user_id, name, email, message_content)
        VALUES (?, ?, ?, ?)`,
        [user_id, name, email, message]
    );
}