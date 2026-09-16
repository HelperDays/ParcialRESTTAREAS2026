import type {
  FastifyPluginAsyncTypebox,
  Static,
} from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { tareasRepo } from "../../services/tareas-repository.ts";
import { ErrorSchema } from "../../models/errors-model.ts";
import { Tarea } from "../../models/tareas.ts";
import {} from "fastify";
import {
  NotAuthorizedError,
  NotFoundError,
} from "../../errors/response.errors.ts";

type Tarea = Static<typeof Tarea>;

const tareasRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/tareas",
    {
      schema: {
        summary: "Devuelve una lista de tareas",
        description: "Devuelve las tareas si estas autenticado",
        tags: ["tareas"],
        response: {
          200: Type.Array(Tarea),
          403: ErrorSchema,
        },
        security: [{ bearerAuth: [] }],
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
      return (await tareasRepo.obtenerTodas()) as Tarea[];
    },
  );
  fastify.post(
    "/tarea",
    {
      schema: {
        summary: "Crear una tarea",
        description: "Crea una tarea,solo admin o superadmin,",
        tags: ["tareas"],
        response: {},
        security: [{ bearerAuth: [] }],
      },
      /*
      onRequest: async (req, res) => {
        fastify.authenticate(req, res);

        const user = req.user as Tarea;
        if (
          !user ||
          !user.grupo ||
          !user.grupo.some((grupo) => grupo === "admin")
          
        ) {
          throw new NotAuthorizedError(
            "No tienes permisos para realizar esta acción.",
          );
        }*/
    },
    async (req, res) => {
      throw new NotFoundError();
    },
  );
  fastify.put(
    "/:serviceId",
    {
      schema: {
        tags: ["tareas"],
        summary: "Actualizar el estado de una tarea",
        description: "Dar por finalizado o cerrada una tarea",
        security: [{ bearerAuth: [] }],
        /*
        params: Type.Object({
          serviceId: Type.Integer({ minimum: 1 }),
        })*/
        response: {
          //200: type,
          400: ErrorSchema,
          401: ErrorSchema,
          403: ErrorSchema,
          404: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async (req) => {
      throw new NotFoundError();
    },
  );
};
export default tareasRoutes;
