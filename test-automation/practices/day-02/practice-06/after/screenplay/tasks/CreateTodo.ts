// Importa Task desde Serenity/JS.
import { Task } from '@serenity-js/core';

// Importa la Interaction utilizada por la Task.
import { AddTodoItem } from '../interactions/AddTodoItem';

// Representa la intencion de crear una tarea.
export const CreateTodo = (title: string) =>
  Task.where(
    // Describe lo que quiere conseguir el Actor.
    `#actor crea la tarea "${title}"`,

    // Delega el detalle tecnico.
    AddTodoItem(title),
  );
