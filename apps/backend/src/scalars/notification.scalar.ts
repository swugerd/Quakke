import { Notifications } from '@prisma/client';
import { GraphQLScalarType, Kind } from 'graphql';
import { scalarValidate } from 'src/utils/scalarValidate';

export const NotificationScalar = new GraphQLScalarType({
  name: 'NotificationScalar',
  description: 'Custom scalar for notification types',
  serialize: (value) => scalarValidate(value),
  parseValue: (value) => scalarValidate(value),
  parseLiteral: (ast) =>
    scalarValidate(
      ast.kind === Kind.STRING ? ast.value : null,
      Object.values(Notifications),
      'Invalid notification type',
    ),
});
