// Importa Question desde Serenity/JS.
import { Question } from '@serenity-js/core';

// Importa el estado que sera consultado.
import { todoItems } from '../state/TodoList';

// Representa la consulta de tareas pendientes.
export const PendingTodoCount = () =>
  Question.about(
    // Describe la informacion solicitada.
    'cantidad de tareas pendientes',

    // Calcula la respuesta.
    async () => {
      // Filtra solamente las tareas pendientes.
      const pendingItems = todoItems.filter(item => !item.completed);

      // Devuelve la cantidad encontrada.
      return pendingItems.length;
    },
  );
