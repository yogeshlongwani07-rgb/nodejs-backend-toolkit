const fs = require("fs");

const result0 = fs.writeFileSync("app.txt", "Hi, I am Yogesh");
const result = fs.readFileSync("app.txt", "utf-8");

const result1 = fs.writeFileSync("app1.txt", "Hi, My name is also Yogesh");

const result2 = fs.appendFileSync("app.txt", "\nmy name is bla bla");
console.log(result2);

const result4 = fs.unlinkSync("app1.txt", () => {
  console.log("file delet");
});
console.log(result4);

const result3 = fs.open("app.txt", "r", (err, fd) => {
  if (err) {
    console.log("error", err);
    return;
  }
  console.log("opened");
  console.log(fd);
  fs.close(fd, () => {
    console.log("File closed");
  });
});
console.log(result3);

const result5 = fs.copyFileSync("app.txt", "app3.txt");
console.log(result5);

const result6 = fs.truncateSync("app.txt", 10);
console.log(result6);

const result7 = fs.mkdirSync("./app1.txt");

const result8 = fs.appendFileSync("app.txt", "ogesh");
const result9 = fs.rmSync("app1.txt", { recursive: true });
const result10 = fs.unlinkSync("app3.txt");

const result11 = fs.statSync("app.txt");
