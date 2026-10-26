// Importa Interaction desde Serenity/JS.
import { Interaction } from '@serenity-js/core';

// Importa el estado del ejercicio.
import { todoItems } from '../state/TodoList';

// Representa la accion concreta de agregar una tarea.
export const AddTodoItem = (title: string) =>
  Interaction.where(
    // Describe la accion realizada por el Actor.
    `#actor agrega la tarea "${title}"`,

    // Ejecuta la accion.
    async () => {
      // Modifica el estado del sistema.
      todoItems.push({
        // Guarda el titulo.
        title: title,

        // La tarea inicia como pendiente.
        completed: false,
      });
    },
  );
