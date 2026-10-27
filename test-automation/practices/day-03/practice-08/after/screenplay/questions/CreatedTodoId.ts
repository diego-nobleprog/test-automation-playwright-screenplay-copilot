// Importa LastResponse para consultar la ultima respuesta HTTP.
import { LastResponse } from '@serenity-js/rest';

// Importa el modelo de la tarea creada.
import { TodoItem } from '../models/TodoItem';

// Representa la pregunta por el id generado por el backend.
export const CreatedTodoId = () =>

  // Obtiene el id de la ultima tarea creada mediante API.
  LastResponse
    .body<TodoItem>()
    .id;
