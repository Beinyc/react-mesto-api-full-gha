module.exports = class ErrorHandler extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
