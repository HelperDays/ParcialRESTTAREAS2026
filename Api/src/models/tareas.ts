import { Type } from "@fastify/type-provider-typebox";
import { timeStamp } from "console";

export const Tarea = Type.Object({
  id_tarea: Type.Integer(),
  id_creador: Type.Integer(),
  grupo: Type.String(),
  Titulo: Type.String(),
  descripcion: Type.String(),
  prioridad: Type.Integer(), //cambiar probablemente
  creada: Type.Boolean(), //por un error lo hice bool
  terminada: Type.Boolean(), //por un error lo hice bool
  estado: Type.Boolean(),
});

export const ActualizarTareaDTO = Type.Object({
  //adadss hacer
});
export const CrearTareaDTO = Type.Object({
  //asdsf hacer
});
