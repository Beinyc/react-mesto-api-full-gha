module.exports = class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
