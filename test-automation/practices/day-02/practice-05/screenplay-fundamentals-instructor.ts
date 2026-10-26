import {
  Interaction,
  Question,
  Task,
  actorCalled,
} from '@serenity-js/core';

// Define la estructura que representa una tarea de nuestra aplicacion.
interface TodoItem {
  // Define el titulo de la tarea.
  title: string;

  // Define si la tarea esta completada.
  completed: boolean;
}

// Crea una lista en memoria que representa el estado del sistema.
const todoItems: TodoItem[] = [];

// Crea una Interaction llamada AddTodoItem.
const AddTodoItem = (title: string) =>
  // Interaction.where permite describir una accion concreta realizada por el Actor.
  Interaction.where(
    // #actor sera reemplazado por el nombre del Actor durante la ejecucion.
    `#actor agrega la tarea "${title}"`,

    // Esta funcion contiene la accion concreta de la Interaction.
    async () => {
      // Agrega una nueva tarea a la lista en memoria.
      todoItems.push({
        // Guarda el titulo recibido.
        title: title,

        // La nueva tarea inicia como pendiente.
        completed: false,
      });
    },
  );

// Crea una Task llamada CreateTodo.
const CreateTodo = (title: string) =>
  // Task.where representa una intencion de negocio.
  Task.where(
    // Describe lo que el Actor quiere lograr.
    `#actor crea la tarea "${title}"`,

    // La Task delega la accion concreta a una Interaction.
    AddTodoItem(title),
  );

// Crea una Question que consulta la cantidad de tareas pendientes.
const PendingTodoCount = () =>
  // Question.about describe la informacion que el Actor desea consultar.
  Question.about(
    // Describe la pregunta que se realiza al sistema.
    'cantidad de tareas pendientes',

    // Calcula la respuesta utilizando el estado actual de la lista.
    async () => {
      // Filtra las tareas que todavia no estan completadas.
      const pendingItems = todoItems.filter(item => !item.completed);

      // Devuelve la cantidad de tareas pendientes.
      return pendingItems.length;
    },
  );

// Define la funcion principal del ejercicio.
async function main(): Promise<void> {
  // Crea un Actor llamado Diego.
  const diego = actorCalled('Diego');

  // El Actor ejecuta una Task mediante attemptsTo.
  await diego.attemptsTo(
    // La Task expresa la intencion de crear una tarea.
    CreateTodo('Preparar capacitacion'),
  );

  // El Actor responde la Question sobre la cantidad de tareas pendientes.
  const pendingCount = await diego.answer(
    // Ejecuta la Question definida anteriormente.
    PendingTodoCount(),
  );

  // Muestra el estado completo de la lista.
  console.log('Tareas:', todoItems);

  // Muestra la cantidad de tareas pendientes obtenida mediante la Question.
  console.log('Cantidad de tareas pendientes:', pendingCount);
}

// Ejecuta el escenario.
main();
