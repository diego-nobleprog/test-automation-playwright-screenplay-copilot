// Importa Playwright Test integrado con Serenity/JS.
import { test } from '@serenity-js/playwright-test';

// Importa la habilidad para consumir la API.
import { CallAnApi } from '@serenity-js/rest';

// Importa la Question que obtiene el id creado por el backend.
import { CreatedTodoId } from './screenplay/questions/CreatedTodoId';

// Importa las Tasks que expresan las intenciones del Actor.
import { CompleteTodoViaUi } from './screenplay/tasks/CompleteTodoViaUi';
import { CreateTodoViaApi } from './screenplay/tasks/CreateTodoViaApi';
import { DeleteTodoViaApi } from './screenplay/tasks/DeleteTodoViaApi';
import { VerifyTodoViaApi } from './screenplay/tasks/VerifyTodoViaApi';

// Define el mismo flujo funcional de P7 utilizando Screenplay.
test('preparar por API, actuar por UI y verificar por API con Screenplay', async ({ actor }) => {

  // Genera un titulo unico para mantener independencia entre ejecuciones.
  const title = 'P8 Screenplay API UI ' + Date.now();

  // Guarda el id generado por el backend.
  let taskId: number | undefined;

  // Configura la API utilizada por las Tasks REST.
  actor.whoCan(
    CallAnApi.at('http://localhost:8080'),
  );

  // Garantiza que el cleanup pueda ejecutarse aunque falle una validacion.
  try {

    // El Actor prepara el dato mediante API.
    await actor.attemptsTo(
      CreateTodoViaApi.called(title),
    );

    // El Actor obtiene el id generado por el backend.
    taskId = await actor.answer(
      CreatedTodoId(),
    );

    // El Actor realiza la accion desde UI y verifica por API.
    await actor.attemptsTo(
      CompleteTodoViaUi.called({
        id: taskId,
        title,
      }),

      VerifyTodoViaApi.matching({
        id: taskId,
        title,
      }),
    );

  // Ejecuta el cleanup al finalizar.
  } finally {

    // Solo elimina cuando la tarea realmente fue creada.
    if (taskId !== undefined) {

      // El cleanup tambien se expresa mediante una Task.
      await actor.attemptsTo(
        DeleteTodoViaApi.withId(taskId),
      );
    }
  }
});
