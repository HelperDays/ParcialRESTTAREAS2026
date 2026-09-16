import { Type } from "@fastify/type-provider-typebox";

export const ErrorSchema = Type.Object({
  error: Type.String(),
  message: Type.String(),
  statusCode: Type.Number(),
  code: Type.Optional(Type.String()),
});
