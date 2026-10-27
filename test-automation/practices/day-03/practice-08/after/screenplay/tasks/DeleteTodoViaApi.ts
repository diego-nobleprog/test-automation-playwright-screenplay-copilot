// Importa las validaciones declarativas de Serenity/JS.
import { Ensure, equals } from '@serenity-js/assertions';

// Importa Task para representar una intencion del Actor.
import { Task } from '@serenity-js/core';

// Importa las herramientas REST utilizadas para el cleanup.
import {
  DeleteRequest,
  LastResponse,
  Send,
} from '@serenity-js/rest';

// Representa la intencion de eliminar la tarea creada por la prueba.
export const DeleteTodoViaApi = {

  // Construye la Task utilizando el id de la tarea.
  withId: (id: number) =>
    Task.where(

      // Describe la intencion del Actor.
      `#actor deletes todo ${ id } via API`,

      // Elimina el recurso mediante HTTP DELETE.
      Send.a(
        DeleteRequest.to('/api/tasks/' + id),
      ),

      // Verifica que el backend confirme la eliminacion.
      Ensure.that(
        LastResponse.status(),
        equals(204),
      ),
    ),
};
