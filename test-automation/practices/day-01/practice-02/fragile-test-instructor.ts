// Importamos las funciones test y expect proporcionadas por Playwright Test.
import { test, expect } from '@playwright/test';

// Definimos una prueba cuyo propósito declarado es completar una tarea.
test('completar una tarea', async ({ page }) => {

  // Abrimos la aplicación web que queremos probar.
  await page.goto('http://localhost:4200');

  /*
   * PROBLEMA 1: ESPERA FIJA
   *
   * La prueba siempre espera exactamente tres segundos antes de continuar.
   *
   * ¿Por qué es un problema?
   *
   * Si la aplicación está lista antes, desperdiciamos tiempo.
   * Si necesita más de tres segundos, la prueba puede continuar demasiado pronto.
   * El resultado termina dependiendo de un tiempo arbitrario en lugar de una condición real.
   */
  // Esperamos artificialmente tres segundos.
  await page.waitForTimeout(3000);

  /*
   * PROBLEMA 2: SELECTOR FRÁGIL
   *
   * El elemento se localiza utilizando su posición dentro de la estructura HTML.
   *
   * ¿Por qué es un problema?
   *
   * La prueba supone que existe un segundo div y que dentro de él el tercer botón
   * corresponde exactamente a la acción que queremos realizar.
   *
   * Un cambio pequeño en la estructura visual puede modificar esas posiciones
   * y romper la prueba aunque la funcionalidad continúe siendo correcta.
   */
  // Localizamos un botón utilizando posiciones específicas dentro del HTML y hacemos clic.
  await page.locator('div:nth-child(2) > button:nth-child(3)').click();

  /*
   * PROBLEMA 3: SEGUNDA ESPERA FIJA
   *
   * Después de hacer clic esperamos dos segundos sin comprobar qué está ocurriendo.
   *
   * ¿Por qué es un problema?
   *
   * No sabemos si la operación terminó antes ni si necesita más tiempo.
   * La prueba vuelve a depender de una cantidad arbitraria de tiempo.
   * Esto puede producir ejecuciones innecesariamente lentas o fallos intermitentes.
   */
  // Esperamos artificialmente otros dos segundos.
  await page.waitForTimeout(2000);

  /*
   * PROBLEMA 4: DEPENDENCIA DE DATOS EXISTENTES
   *
   * La prueba selecciona simplemente la primera tarea encontrada.
   *
   * ¿Por qué es un problema?
   *
   * La propia prueba no creó ni controla esa tarea.
   * Si no existen tareas, el escenario no puede continuar.
   * Si existen varias, la primera podría cambiar entre ejecuciones.
   * El resultado depende entonces del estado previo de la aplicación.
   */
  // Buscamos todos los elementos con la clase task y seleccionamos únicamente el primero.
  const task = page.locator('.task').first();

  // Hacemos clic sobre la tarea encontrada.
  await task.click();

  /*
   * PROBLEMA 5: ASERCIÓN INSUFICIENTE
   *
   * La comprobación solamente verifica que la tarea sea visible.
   *
   * ¿Por qué es un problema?
   *
   * El propósito declarado de la prueba es completar una tarea.
   * Sin embargo, nunca comprobamos que realmente haya cambiado a estado completado.
   *
   * La tarea podría permanecer exactamente igual y la prueba seguiría pasando
   * simplemente porque el elemento continúa visible.
   */
  // Consultamos si el elemento está visible y esperamos que el resultado sea verdadero.
  expect(await task.isVisible()).toBeTruthy();

// Cerramos la definición de la primera prueba.
});

// Definimos una prueba encargada de crear una tarea que utilizará otro escenario.
test('crear una tarea para otra prueba', async ({ page }) => {

  // Abrimos nuevamente la aplicación web.
  await page.goto('http://localhost:4200');

  // Localizamos el campo de texto mediante un identificador.
  const input = page.locator('#task-input');

  // Escribimos el nombre de una tarea.
  await input.fill('Preparar capacitación');

  // Localizamos el botón utilizado para crear tareas.
  const createButton = page.locator('#create-task');

  // Hacemos clic sobre el botón de creación.
  await createButton.click();

  // Localizamos el texto correspondiente a la tarea recién creada.
  const createdTask = page.getByText('Preparar capacitación');

  // Verificamos que la tarea recién creada aparezca en la interfaz.
  await expect(createdTask).toBeVisible();

// Cerramos la definición de la segunda prueba.
});

// Definimos otra prueba que intenta trabajar con la tarea creada anteriormente.
test('completar la tarea creada por otra prueba', async ({ page }) => {

  // Abrimos nuevamente la aplicación web.
  await page.goto('http://localhost:4200');

  /*
   * PROBLEMA 6: DEPENDENCIA ENTRE PRUEBAS
   *
   * Esta prueba supone que "Preparar capacitación" ya fue creada por otra prueba.
   *
   * ¿Por qué es un problema?
   *
   * Una prueba automatizada debería poder ejecutarse independientemente.
   *
   * Si ejecutamos únicamente esta prueba, la tarea podría no existir.
   * Si las pruebas se ejecutan en otro orden, también podría fallar.
   * Si otra prueba modifica o elimina el dato, este escenario se ve afectado.
   *
   * La prueba depende del estado dejado por otra prueba y deja de ser independiente.
   */
  // Buscamos directamente una tarea que suponemos que ya existe.
  const existingTask = page.getByText('Preparar capacitación');

  // Hacemos clic sobre la tarea que otra prueba debería haber creado.
  await existingTask.click();

  // Verificamos únicamente que la tarea continúe visible.
  await expect(existingTask).toBeVisible();

// Cerramos la definición de la tercera prueba.
});
