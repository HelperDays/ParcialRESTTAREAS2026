import type {
  FastifyPluginAsyncTypebox,
  Static,
} from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
//import { NotAuthorizedError } from "../../errors/response.errors";
import { UsuarioSchema } from "../../models/usuarios-schema.ts";
import { usuariosRepo } from "../../services/usuarios-repository.ts";
import { ErrorSchema } from "../../models/errors-model.ts";

type UsuarioSchema = Static<typeof UsuarioSchema>;

//a
const usuariiosRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/usuarios",
    {
      schema: {
        summary: "Devuelve una lista de usuarios",
        description: "Devuelve los usuarios",
        tags: ["usuarios"],
        response: {
          200: Type.Array(UsuarioSchema),
          403: ErrorSchema,
        },
        //security: [{ bearerAuth: [] }],
      },
      /*
      onRequest: async (req, res) => {
        fastify.authenticate(req, res);

        const user = req.user as UsuarioSchema;
        if (
          !user ||
          !user.roles ||
          !user.roles.some((rol) => rol === "admin")
        ) {
          throw new NotAuthorizedError(
            "No tienes permisos para realizar esta acción.",
          );
        }
      },
      */
    },
    async (req, res) => {
      return (await usuariosRepo.obtenerTodos()) as UsuarioSchema[];
    },
  );
};

export default usuariiosRoutes;
