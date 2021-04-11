const express = require('express');
const multer = require('multer');
const path = require('path');
const http = require('http');
const logPaths = path.join(__dirname, 'temp');

const app = express();
const server = http.createServer(app);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, logPaths)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

let upload = multer({
  storage:storage
}).single('file');

app.post('/api/logs', upload, (req, res) => {
  req.body.filename = req.file.filename
  res.end();
});

server.listen(3000, () => {
  console.log('running on port 3000');
});
