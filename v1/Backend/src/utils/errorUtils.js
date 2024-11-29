const createErrorResponse = (statusCode, message) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};

module.exports = { createErrorResponse };
