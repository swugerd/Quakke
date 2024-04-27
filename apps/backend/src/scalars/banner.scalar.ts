import { BannerTypes } from '@prisma/client';
import { GraphQLScalarType, Kind } from 'graphql';
import { scalarValidate } from 'src/utils/scalarValidate';

export const BannerScalar = new GraphQLScalarType({
  name: 'BannerScalar',
  description: 'Custom scalar for banner types',
  serialize: (value) => scalarValidate(value),
  parseValue: (value) => scalarValidate(value),
  parseLiteral: (ast) =>
    scalarValidate(
      ast.kind === Kind.STRING ? ast.value : null,
      Object.values(BannerTypes),
      'Invalid banner type',
    ),
});
