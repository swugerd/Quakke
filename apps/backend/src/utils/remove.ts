import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

export const removeFile = async (dir: string, filename: string) => {
  const filePath = join(dir, filename);

  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    throw new NotFoundException(err.message);
  }
};
