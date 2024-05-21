import { NotFoundException } from '@nestjs/common';
import { createWriteStream, mkdirSync, stat } from 'fs';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import { finished } from 'stream/promises';
import { promisify } from 'util';

export const uploadFile = async (
  readStream: FileUpload['createReadStream'],
  uploadDir: string,
  filename: string,
) => {
  const filePath = join(uploadDir, filename);

  mkdirSync(uploadDir, { recursive: true });

  const inStream = readStream();
  const outStream = createWriteStream(filePath);

  inStream.pipe(outStream);

  await finished(outStream).catch((err) => {
    console.error(err.message);
    throw new NotFoundException(err.message);
  });

  const { size } = await promisify(stat)(filePath);

  return size;
};
