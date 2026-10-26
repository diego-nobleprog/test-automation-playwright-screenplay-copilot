// Define la estructura de una tarea.
interface TodoItem {
  // Define el titulo de la tarea.
  title: string;

  // Define si la tarea esta completada.
  completed: boolean;
}

// Crea una lista en memoria que representa el estado del sistema.
const todoItems: TodoItem[] = [];

// Define una funcion tradicional para agregar una tarea.
function addTodoItem(title: string): void {
  // Agrega directamente una nueva tarea a la lista.
  todoItems.push({
    // Guarda el titulo recibido.
    title: title,

    // La nueva tarea inicia como pendiente.
    completed: false,
  });
}

// Define una funcion tradicional para consultar tareas pendientes.
function pendingTodoCount(): number {
  // Filtra las tareas que todavia no estan completadas.
  const pendingItems = todoItems.filter(item => !item.completed);

  // Devuelve la cantidad encontrada.
  return pendingItems.length;
}

// Ejecuta directamente la funcion que modifica el sistema.
addTodoItem('Preparar capacitacion');

// Ejecuta directamente la funcion que consulta el sistema.
const pendingCount = pendingTodoCount();

// Muestra el estado completo de la lista.
console.log('Tareas:', todoItems);

// Muestra la cantidad de tareas pendientes.
console.log('Cantidad de tareas pendientes:', pendingCount);
