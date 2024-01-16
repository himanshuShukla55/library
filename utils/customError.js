const customError = (statusCode, errorMessage) => {
  const error = new Error();
  error.statusCode = statusCode || 400;
  error.message = errorMessage || "Server Error!";
  throw error;
};

export default customError;
