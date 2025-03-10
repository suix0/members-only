class customNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "Not Found Error";
  }
}

module.exports = customNotFound;
