require("dotenv").config({ path: "../.env" });
const { Client } = require("pg");

const SQL = `
  CREATE TABLE users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 255 ) NOT NULL,
    last_name VARCHAR ( 255 ) NOT NULL,
    user_name VARCHAR ( 255 ) NOT NULL,
    password_hash VARCHAR ( 255 ) NOT NULL,
    is_admin BOOL,
    is_member BOOL
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
  DROP TABLE post;
  DROP TABLE users;
`;

const main = async () => {
  console.log("seeding...");
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.DATABASE_PORT,
    ssl: {
      require: true,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Sucessful!");
};

main();
