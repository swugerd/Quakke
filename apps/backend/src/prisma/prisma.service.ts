import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  static getPrismaSearchingProperties(
    rawSearchingProperties: Record<string, unknown>,
  ): Array<Record<string, { contains: unknown; mode: 'insensitive' }>> {
    const entries = Object.entries(rawSearchingProperties);
    const result = [];
    for (let i = 0; i < entries.length; i++) {
      if (entries[i][1]) {
        result.push(
          Object.fromEntries([
            [
              entries[i][0],
              {
                contains: entries[i][1],
                mode: 'insensitive',
              },
            ],
          ]),
        );
      }
    }
    return result;
  }
}
