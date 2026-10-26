// Declara una constante llamada tasks que contiene un arreglo de objetos de tipo Task.
const tasks = [
    // Inicia la definicion de la primera tarea.
    {
        // Asigna el titulo de la primera tarea.
        title: 'Preparar capacitacion',
        // Indica que la primera tarea todavia no esta completada.
        completed: false,
    },
    // Inicia la definicion de la segunda tarea.
    {
        // Asigna el titulo de la segunda tarea.
        title: 'Revisar pruebas',
        // Indica que la segunda tarea ya esta completada.
        completed: true,
    },
    // Inicia la definicion de la tercera tarea.
    {
        // Asigna el titulo de la tercera tarea.
        title: 'Actualizar documentacion',
        // Indica que la tercera tarea todavia no esta completada.
        completed: false,
    },
];
// Declara una funcion que recibe un arreglo de tareas y devuelve solamente las pendientes.
function getPendingTasks(tasks) {
    // Utiliza filter para conservar las tareas cuyo valor completed sea false.
    return tasks.filter(task => !task.completed);
}
// Declara una funcion que recibe un arreglo de tareas y devuelve solamente las completadas.
function getCompletedTasks(tasks) {
    // Utiliza filter para conservar las tareas cuyo valor completed sea true.
    return tasks.filter(task => task.completed);
}
// Declara una funcion que recibe un arreglo de tareas y devuelve un numero.
function countCompletedTasks(tasks) {
    // Obtiene primero las tareas completadas y devuelve la cantidad de elementos encontrados.
    return getCompletedTasks(tasks).length;
}
// Declara una funcion que recibe un arreglo de tareas y devuelve un numero.
function countPendingTasks(tasks) {
    // Obtiene primero las tareas pendientes y devuelve la cantidad de elementos encontrados.
    return getPendingTasks(tasks).length;
}
// Declara una funcion asincrona que devolvera una promesa con un arreglo de tareas.
async function loadTasks() {
    // Devuelve el arreglo de tareas definido anteriormente.
    return tasks;
}
// Declara la funcion principal del ejercicio como una funcion asincrona.
async function main() {
    // Espera a que loadTasks termine y almacena las tareas obtenidas.
    const loadedTasks = await loadTasks();
    // Obtiene solamente las tareas pendientes a partir de las tareas cargadas.
    const pendingTasks = getPendingTasks(loadedTasks);
    // Obtiene solamente las tareas completadas a partir de las tareas cargadas.
    const completedTasks = getCompletedTasks(loadedTasks);
    // Calcula la cantidad total de tareas pendientes.
    const pendingCount = countPendingTasks(loadedTasks);
    // Calcula la cantidad total de tareas completadas.
    const completedCount = countCompletedTasks(loadedTasks);
    // Muestra en consola todas las tareas cargadas.
    console.log('Todas las tareas:', loadedTasks);
    // Muestra en consola solamente las tareas pendientes.
    console.log('Tareas pendientes:', pendingTasks);
    // Muestra en consola solamente las tareas completadas.
    console.log('Tareas completadas:', completedTasks);
    // Muestra en consola la cantidad total de tareas pendientes.
    console.log('Cantidad de tareas pendientes:', pendingCount);
    // Muestra en consola la cantidad total de tareas completadas.
    console.log('Cantidad de tareas completadas:', completedCount);
}
// Ejecuta la funcion principal para iniciar el ejercicio.
main();
