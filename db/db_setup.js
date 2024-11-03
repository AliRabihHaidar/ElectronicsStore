import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();


export async function initializeDatabase() {
    // Connect to MySQL without specifying a database initially
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true,
    });

    // Check if the database exists
    const [rows] = await connection.query(
        `SHOW DATABASES LIKE '${process.env.DB_NAME}'`
    );

    if (rows.length === 0) {
        console.log(`Database "${process.env.DB_NAME}" does not exist. Creating...`);

        // Create the database
        await connection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log(`Database "${process.env.DB_NAME}" created successfully.`);

        // Use the newly created database
        await connection.query(`USE ${process.env.DB_NAME}`);

        // Read and execute the schema SQL file
        const schemaPath = path.resolve('db/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf-8');
        await connection.query(schema);
        // Read and execute the triggers SQL file
        const triggersPath = path.resolve('db/triggers.sql');
        const triggers = fs.readFileSync(triggersPath, 'utf-8');
        await connection.query(triggers);

        console.log("Tables and triggers created successfully.");
    } else {
        console.log(`Database "${process.env.DB_NAME}" already exists. Skipping creation.`);
    }

    await connection.end();
}
