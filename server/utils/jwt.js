const jwt = require("jsonwebtoken");
const defaults = {
  audience: ["user"],
};

const refreshTokenOptions = {
  expiresIn: "30d",
  secret: process.env.JWT_REFRESH_SECRET,
};
const accessTokenOptions = {
  expiresIn: "15m",
  secret: process.env.JWT_ACCESS_SECRET,
};
const signToken = (payload, options) => {
  const { secret, ...otherOption } = options;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...otherOption,
  });
};

const verifyToken = (token, options) => {
  const { secret, ...otherOptions } = options;
  const payload = jwt.verify(token, secret, {
    ...defaults,
    ...otherOptions,
  });

  return payload;
};

module.exports = {
  signToken,
  verifyToken,
  refreshTokenOptions,
  accessTokenOptions,
};
