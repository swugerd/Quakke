import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const pathFinderMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const filePath: string = await next();

  const hostname = process.env.SERVER_HOST;
  const port = process.env.SERVER_PORT;

  return `${hostname}:${port}/${filePath}`;
};
