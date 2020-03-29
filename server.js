const express = require('express');
const userRouter = require("./users/userRouter");

const server = express();

server.use(express.json());
server.use(logger);
// server.use(validateUserId);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", userRouter);

//custom middleware

//`logger()`
//`logger` logs to the console the following information about each request: request method, request url, and a timestamp
//this middleware runs on every request made to the API
function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  next();
}


module.exports = server;
