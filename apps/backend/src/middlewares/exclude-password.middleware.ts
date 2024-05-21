import { FieldMiddleware } from '@nestjs/graphql';

export const excludePasswordMiddleware: FieldMiddleware = async () => {
  return null;
};
