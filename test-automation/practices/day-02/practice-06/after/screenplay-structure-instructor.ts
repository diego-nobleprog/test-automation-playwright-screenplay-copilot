// Importa la funcion necesaria para crear el Actor.
import { actorCalled } from '@serenity-js/core';

// Importa la Task utilizada por el escenario.
import { CreateTodo } from './screenplay/tasks/CreateTodo';

// Importa la Question utilizada por el escenario.
import { PendingTodoCount } from './screenplay/questions/PendingTodoCount';

// Importa el estado solamente para mostrar el resultado del ejercicio.
import { todoItems } from './screenplay/state/TodoList';

// Define el escenario principal.
async function main(): Promise<void> {
  // Crea el Actor.
  const diego = actorCalled('Diego');

  // El Actor expresa una intencion mediante una Task.
  await diego.attemptsTo(
    CreateTodo('Preparar capacitacion'),
  );

  // El Actor consulta informacion mediante una Question.
  const pendingCount = await diego.answer(
    PendingTodoCount(),
  );

  // Muestra el estado final.
  console.log('Tareas:', todoItems);

  // Muestra la respuesta obtenida.
  console.log('Cantidad de tareas pendientes:', pendingCount);
}

// Ejecuta el escenario.
main();
