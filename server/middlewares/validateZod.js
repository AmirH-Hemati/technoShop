module.exports = (schema) => {
  return (req, res, next) => {
    schema.parse(req.body);
    next();
  };
};
