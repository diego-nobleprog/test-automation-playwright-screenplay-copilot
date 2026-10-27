// Importa las validaciones declarativas de Serenity/JS.
import { Ensure, equals } from '@serenity-js/assertions';

// Importa Task para representar una intencion del Actor.
import { Task } from '@serenity-js/core';

// Importa las interacciones web utilizadas por la Task.
import {
  Click,
  Navigate,
  isVisible,
} from '@serenity-js/web';

// Importa la Question que consulta el estado visible de una tarea.
import { TodoStatus } from '../questions/TodoStatus';

// Importa los elementos observables de la lista de tareas.
import { TodoList } from '../state/TodoList';

// Define la referencia necesaria para trabajar con la tarea.
interface TodoReference {

  // Identificador real generado por el backend.
  id: number;

  // Titulo utilizado para describir la actividad.
  title: string;
}

// Representa la intencion de completar una tarea desde la UI.
export const CompleteTodoViaUi = {

  // Construye una Task utilizando el id y titulo de la tarea.
  called: (todo: TodoReference) =>
    Task.where(

      // Describe la intencion del Actor.
      `#actor completes "${ todo.title }" through the UI`,

      // Abre la aplicacion Angular.
      Navigate.to('http://localhost:4200'),

      // Espera hasta que Angular muestre la tarea creada mediante API.
      Ensure.eventually(
        TodoList.taskWithId(todo.id),
        isVisible(),
      ),

      // Verifica que inicialmente la tarea este pendiente.
      Ensure.that(
        TodoStatus.of(todo.id),
        equals('pending'),
      ),

      // Hace click sobre el input checkbox real.
      Click.on(
        TodoList.checkboxFor(todo.id),
      ),

      // Espera hasta que la UI refleje el cambio persistido.
      Ensure.eventually(
        TodoStatus.of(todo.id),
        equals('completed'),
      ),
    ),
};
