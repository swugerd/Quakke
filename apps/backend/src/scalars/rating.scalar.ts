import { GraphQLScalarType, Kind } from 'graphql';

function validate(rating: unknown): string | never {
  if (rating !== 'like' && rating !== 'dislike') {
    throw new Error('Invalid rating');
  }
  return rating;
}

export const RatingScalar = new GraphQLScalarType({
  name: 'RatingScalar',
  description: 'Custom scalar for like or dislike',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) => validate(ast.kind === Kind.STRING ? ast.value : null),
});
