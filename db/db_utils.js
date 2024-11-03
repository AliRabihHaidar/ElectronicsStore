// db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
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

export async function getCart(user_id) {
    // join cart_item, cart, and product tables
    const rows = await query(`
        SELECT product.product_id, product.product_name, product.price, product.description, COUNT(cart_item.cart_id) AS quantity
        FROM cart_item
        JOIN cart ON cart_item.cart_id = cart.cart_id
        JOIN product ON cart_item.product_id = product.product_id
        WHERE cart.user_id = ?
        GROUP BY product.product_id
    `, [user_id]);
    return rows;
}

export async function addProductToCart(product_id, user_id) {
    const rows = await query('SELECT cart_id FROM cart WHERE user_id = ?', [user_id]);
    const cart_id = rows[0].cart_id;
    
    await query('INSERT INTO cart_item (cart_id, product_id) VALUES (?, ?)', [cart_id, product_id]);
}

export async function removeProductFromCart(product_id, user_id) {
    const cart_id = (await query('SELECT cart_id FROM cart WHERE user_id = ?', [user_id]))[0].cart_id;
    await query(
        `DELETE FROM cart_item
        WHERE cart_id = ? AND product_id = ?
        LIMIT 1`,
        [cart_id, product_id]
    );
}