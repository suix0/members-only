require("dotenv").config();
const { Client } = require("pg");

const SQL = `
  CREATE TABLE users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 255 ) NOT NULL,
    last_name VARCHAR ( 255 ) NOT NULL,
    user_name VARCHAR ( 255 ) NOT NULL,
    password_hash VARCHAR ( 255 ) NOT NULL,
    is_admin BOOL NOT NULL,
    is_member BOOL NOT NULL
  );

  CREATE TABLE post (
    post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER,
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
  await client.query(SQL);
  await client.end();
  console.log("Sucessful!");
};

main();
