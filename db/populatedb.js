require("dotenv").config({ path: "../.env" });
const { Client } = require("pg");

console.log("DATABASE from .env:", process.env.DATABASE); // Add this to check

const SQL = `
  CREATE TABLE users (
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 255 ) NOT NULL,
    last_name VARCHAR ( 255 ) NOT NULL,
    user_name VARCHAR ( 255 ) NOT NULL,
    password_hash VARCHAR ( 255 ) NOT NULL,
    is_admin BOOL NOT NULL,
    is_member BOOL NOT NULL
  );

  CREATE TABLE post (
    post_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    title VARCHAR ( 255 ) NOT NULL,
    content VARCHAR ( 255 ) NOT NULL,
    date_added TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
  );
`;

const DROP = `
  DROP TABLE users;
  DROP TABLE post;
`;

const main = async () => {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
  });
  await client.connect();
  const dbName = await client
    .query("SELECT current_database()")
    .then((res) => res.rows[0].current_database);
  console.log("Connected to database:", dbName);
  await client.query(SQL);
  await client.end();
  console.log("Sucessful!");
};

main();
