import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { allowedFileTypes, folders } from '../constants';

export const pathFinderMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const filePath: string = await next();

  const hostname = process.env.SERVER_HOST;
  const port = process.env.SERVER_PORT;
  const staticPath = process.env.STATIC_PATH;
  const contentFolderName = allowedFileTypes.IMAGES.includes(
    ctx.source.extension,
  )
    ? folders.IMAGES
    : folders.VIDEOS;

  return `${hostname}:${port}/${staticPath}/${contentFolderName}/${filePath}`;
};
