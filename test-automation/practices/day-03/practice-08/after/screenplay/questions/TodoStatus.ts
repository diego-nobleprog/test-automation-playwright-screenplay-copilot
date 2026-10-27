// Importa Attribute para consultar atributos HTML mediante Screenplay.
import { Attribute } from '@serenity-js/web';

// Importa los elementos observables de la lista de tareas.
import { TodoList } from '../state/TodoList';

// Representa una pregunta sobre el estado visible de una tarea.
export const TodoStatus = {

  // Consulta data-status usando el id real de la tarea.
  of: (id: number) =>
    Attribute
      .called('data-status')
      .of(TodoList.taskWithId(id)),
};
