const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "college",
  password: "9571862527",
});

let data = [];
let createRandomUser = () => {
  return [
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

for (let i = 0; i < 50; i++) {
  data.push(createRandomUser());
}

let q = "insert into users (username, email, password) values ?";

try {
  db.query(q, [data], (err, results) => {
    if (err) throw err;
    console.log(results);
  });
} catch (err) {
  console.log(err);
}

db.end();
