const { post, connectToDb } = require("../server");
const { faker } = require("@faker-js/faker");

connectToDb();

function genrateRandom(count) {
  let random = [];

  for (let i = 0; i < count; i++) {
    random.push({
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      username: faker.internet.username(),
    });
  }

  return random;
}

async function inserToDB() {
  try {
    const data = genrateRandom(100);
    const result = await post.insertMany(data);
  } catch (err) {
    console.log(err);
  }
}

inserToDB();
