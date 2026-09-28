export const validateBody = (schema) => {
  return function (req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      const error = new Error("validation faild");
      error.statusCode = 400;
      throw error;
    }
  };
};
