export type JwtPayload = {
  email: string;
  userId: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
