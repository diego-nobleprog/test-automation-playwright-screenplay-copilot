// Importa las validaciones declarativas de Serenity/JS.
import { Ensure, equals } from '@serenity-js/assertions';

// Importa Task para representar una intencion del Actor.
import { Task } from '@serenity-js/core';

// Importa las herramientas REST utilizadas por la Task.
import {
  LastResponse,
  PostRequest,
  Send,
} from '@serenity-js/rest';

// Importa el modelo esperado de la respuesta.
import { TodoItem } from '../models/TodoItem';

// Representa la intencion de crear una tarea mediante la API.
export const CreateTodoViaApi = {

  // Construye una Task utilizando el titulo recibido.
  called: (title: string) =>
    Task.where(

      // Describe la intencion del Actor.
      `#actor creates "${ title }" via API`,

      // Envia el POST para crear la tarea.
      Send.a(
        PostRequest
          .to('/api/tasks')
          .with({ title }),
      ),

      // Verifica que el backend responda HTTP 201.
      Ensure.that(
        LastResponse.status(),
        equals(201),
      ),

      // Verifica que el titulo devuelto sea el esperado.
      Ensure.that(
        LastResponse.body<TodoItem>().title,
        equals(title),
      ),

      // Verifica que la tarea nueva comience pendiente.
      Ensure.that(
        LastResponse.body<TodoItem>().completed,
        equals(false),
      ),
    ),
};
