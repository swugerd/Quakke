import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '../interfaces';

export const CurrentUser = createParamDecorator(
  (
    key: keyof JwtPayload,
    context: ExecutionContext,
  ): JwtPayload | Partial<JwtPayload> => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    return key ? req.user[key] : req.user;
  },
);
