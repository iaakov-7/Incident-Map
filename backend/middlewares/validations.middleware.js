export const validateBody = (schema) => {
  return function (req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      const error = new Error(err.errors[0].message);
      error.statusCode = 400;
      throw error;
    }
  };
};
