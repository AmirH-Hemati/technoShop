import jwt, { SignOptions, VerifyOptions, Secret, JwtPayload } from "jsonwebtoken";

interface JWTPayload extends JwtPayload {
  user: string;
}

interface TokenOptions {
  expiresIn: SignOptions["expiresIn"];
  secret: Secret;
}

const defaults: Pick<SignOptions, "audience"> = {
  audience: ["user"],
};

const refreshTokenOptions: TokenOptions = {
  expiresIn: "30d",
  secret: process.env.JWT_REFRESH_SECRET as Secret,
};

const accessTokenOptions: TokenOptions = {
  expiresIn: "15m",
  secret: process.env.JWT_ACCESS_SECRET as Secret,
};

const signToken = (payload: JWTPayload, options: TokenOptions): string => {
  const { secret, ...otherOption } = options;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...otherOption,
  } as SignOptions);
};

const verifyToken = (token: string, options: TokenOptions): JWTPayload => {
  const { secret, ...otherOptions } = options;
  const payload = jwt.verify(token, secret, {
    ...defaults,
    ...otherOptions,
  } as VerifyOptions) as JWTPayload;

  return payload;
};

export { signToken, verifyToken, refreshTokenOptions, accessTokenOptions };