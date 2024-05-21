import { RefreshToken } from '@prisma/client';

export interface Tokens {
  accessToken: string;
  refreshToken: RefreshToken;
}

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}
