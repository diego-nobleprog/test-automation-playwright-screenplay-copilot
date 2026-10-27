// Representa una tarea manejada por la API.
export interface TodoItem {

  // Identificador generado por el backend.
  id: number;

  // Texto de la tarea.
  title: string;

  // Indica si la tarea ya fue completada.
  completed: boolean;
}
