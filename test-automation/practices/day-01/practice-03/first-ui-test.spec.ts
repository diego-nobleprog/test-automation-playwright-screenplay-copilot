// Importamos las funciones test y expect proporcionadas por Playwright Test.
import { test, expect } from '@playwright/test';

// Definimos nuestra primera prueba automatizada de interfaz.
test('crear una tarea desde la interfaz', async ({ page }) => {

  // Abrimos la aplicación To-Do App.
  await page.goto('http://localhost:4200');

  // Localizamos el campo de captura utilizando su etiqueta accesible.
  const taskInput = page.getByLabel('Nueva tarea');

  // Escribimos el nombre de la tarea.
  await taskInput.fill('Preparar capacitación');

  // Localizamos el botón por su rol y por el texto que ve el usuario.
  const createButton = page.getByRole('button', { name: 'Crear tarea' });

  // Hacemos clic para crear la tarea.
  await createButton.click();

  // Localizamos específicamente la tarea que acabamos de crear.
  const createdTask = page.getByText('Preparar capacitación');

  // Verificamos que la nueva tarea aparezca en la interfaz.
  await expect(createdTask).toBeVisible();

  // Localizamos el contador de tareas pendientes.
  const pendingCount = page.getByTestId('pending-count');

  // Verificamos que ahora exista una tarea pendiente.
  await expect(pendingCount).toHaveText('Pendientes: 1');
});
