import {
  Interaction,
  Question,
  Task,
  actorCalled,
} from '@serenity-js/core';

// Define el modelo utilizado por el escenario.
interface TodoItem {
  // Define el titulo de la tarea.
  title: string;

  // Define si la tarea esta completada.
  completed: boolean;
}

// Mantiene el estado del sistema en memoria.
const todoItems: TodoItem[] = [];

// Define la Interaction que agrega una tarea.
const AddTodoItem = (title: string) =>
  Interaction.where(
    // Describe la accion concreta realizada por el Actor.
    `#actor agrega la tarea "${title}"`,

    // Ejecuta la accion concreta.
    async () => {
      // Agrega una nueva tarea al estado.
      todoItems.push({
        // Guarda el titulo recibido.
        title: title,

        // La tarea inicia como pendiente.
        completed: false,
      });
    },
  );

// Define la Task que representa la intencion.
const CreateTodo = (title: string) =>
  Task.where(
    // Describe lo que quiere conseguir el Actor.
    `#actor crea la tarea "${title}"`,

    // Delega el detalle tecnico a la Interaction.
    AddTodoItem(title),
  );

// Define la Question que consulta el estado.
const PendingTodoCount = () =>
  Question.about(
    // Describe la informacion que se desea conocer.
    'cantidad de tareas pendientes',

    // Calcula la respuesta.
    async () => {
      // Obtiene solamente las tareas pendientes.
      const pendingItems = todoItems.filter(item => !item.completed);

      // Devuelve la cantidad encontrada.
      return pendingItems.length;
    },
  );

// Define el escenario principal.
async function main(): Promise<void> {
  // Crea el Actor.
  const diego = actorCalled('Diego');

  // El Actor ejecuta la Task.
  await diego.attemptsTo(
    CreateTodo('Preparar capacitacion'),
  );

  // El Actor responde la Question.
  const pendingCount = await diego.answer(
    PendingTodoCount(),
  );

  // Muestra el estado del sistema.
  console.log('Tareas:', todoItems);

  // Muestra la informacion obtenida.
  console.log('Cantidad de tareas pendientes:', pendingCount);
}

// Ejecuta el escenario.
main();
