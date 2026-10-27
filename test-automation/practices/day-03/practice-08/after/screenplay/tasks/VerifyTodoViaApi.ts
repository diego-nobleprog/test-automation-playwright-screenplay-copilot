// Importa las validaciones declarativas de Serenity/JS.
import { Ensure, equals } from '@serenity-js/assertions';

// Importa Task para representar una intencion del Actor.
import { Task } from '@serenity-js/core';

// Importa las herramientas REST utilizadas por la Task.
import {
  GetRequest,
  LastResponse,
  Send,
} from '@serenity-js/rest';

// Importa el modelo esperado de la respuesta.
import { TodoItem } from '../models/TodoItem';

// Define los datos que deben coincidir con la tarea persistida.
interface ExpectedTodo {

  // Identificador generado por el backend.
  id: number;

  // Titulo utilizado durante la prueba.
  title: string;
}

// Representa la intencion de verificar una tarea mediante API.
export const VerifyTodoViaApi = {

  // Construye la Task con los datos esperados.
  matching: (expected: ExpectedTodo) =>
    Task.where(

      // Describe la intencion del Actor.
      `#actor verifies todo ${ expected.id } via API`,

      // Consulta la tarea directamente por su identificador.
      Send.a(
        GetRequest.to('/api/tasks/' + expected.id),
      ),

      // Verifica que la API responda HTTP 200.
      Ensure.that(
        LastResponse.status(),
        equals(200),
      ),

      // Verifica que sea la misma tarea creada al inicio.
      Ensure.that(
        LastResponse.body<TodoItem>().id,
        equals(expected.id),
      ),

      // Verifica que el titulo siga siendo el esperado.
      Ensure.that(
        LastResponse.body<TodoItem>().title,
        equals(expected.title),
      ),

      // Verifica que el cambio realizado por UI haya sido persistido.
      Ensure.that(
        LastResponse.body<TodoItem>().completed,
        equals(true),
      ),
    ),
};
