const express = require("express");
const app = express();
const multer = require("multer");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "view");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.render("home"); 
});

app.post("/upload", upload.single("uploadFile"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
});

app.listen(3000);
