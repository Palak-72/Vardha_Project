export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const apiResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
