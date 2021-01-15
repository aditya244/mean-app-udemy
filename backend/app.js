const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const postsRoutes = require("./routes/posts")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const mongoose = require('mongoose');


app.use("/images", express.static(path.join("backend/images")));


mongoose.connect('mongodb+srv://aditya244:FRWQA1lBZEm5p46y@cluster0-rjeef.mongodb.net/node-angular')
  .then(() => {
    console.log('Database connected');
  })
  .catch(() => {
    console.log('Connection failed')
  })


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
})

app.use("/api/posts/", postsRoutes);

module.exports = app;
