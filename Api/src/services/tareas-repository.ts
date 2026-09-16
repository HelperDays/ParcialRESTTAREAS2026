import { Static } from "@fastify/type-provider-typebox";
import { pool } from "../db/database.ts";
import { NotFoundError } from "../errors/response.errors.ts";
import { ActualizarTareaDTO, CrearTareaDTO, Tarea } from "../models/tareas.ts";

type Tarea = Static<typeof Tarea>; //typebox neggr
type ActualizarTareaDTO = Static<typeof ActualizarTareaDTO>;
type CrearTareaDTO = Static<typeof CrearTareaDTO>;

class TareasRepository {
  private readonly baseQuery = `
    SELECT * FROM tareas T
  `;

  async obtenerTodas(): Promise<Tarea[]> {
    const query = `
      ${this.baseQuery}
      ORDER BY creada DESC;
    `;
    const res = await pool.query(query, []);
    return res.rows;

    //echa
  }

  async obtenerPorId(id_tarea: number): Promise<Tarea> {
    const query = `
      ${this.baseQuery}
      WHERE id_tarea = $1;
    `;
    const result = await pool.query(query, [id_tarea]);
    if (result.rowCount !== 1) throw new NotFoundError("Tarea no encontrada");
    return result.rows[0];
    //echo
  }

  /*
  async crear(idCreador: number, dto: CrearTareaDTO): Promise<Tarea> {
    await pool.query("BEGIN");

    try {
      const query = `
        INSERT INTO tareas (id_creador, grupo, titulo, descripcion, prioridad)
        VALUES ($1, $2, $3, $4, COALESCE($5, '1:media'))
        RETURNING id_tarea;
      `;
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }
    
*/
  /*



  async actualizar(idTarea: number, dto: ActualizarTareaDTO): Promise<Tarea> {
    const query = `
      UPDATE tareas
      SET campo1=$2, campo2=$3, etc, etc
      WHERE id_tarea = $1;
    `;
    //TODO: Corregir y completar
  }

  async finalizar(idTarea: number, fecha?: string): Promise<Tarea> {
    const query = `
      UPDATE tareas
      SET terminada = $2
      WHERE id_tarea = $1 AND terminada IS NULL;
    `;

    //TODO: Completar. Ojo si la fecha viene vacía. Recuerden que CURRENT_TIMESTAMP hace referencia la fecha y hora actual
  }
*/
  async eliminar(idTarea: number): Promise<void> {
    const query = `
      DELETE FROM tareas
      WHERE id_tarea = $1;
    `;
    //TODO: Completar
  }
}

export const tareasRepo = new TareasRepository();
