const createResult = require("./result");

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const message = err.message || "Internal Server Error";
  res.send(createResult(message, null));
}

module.exports = errorHandler;
