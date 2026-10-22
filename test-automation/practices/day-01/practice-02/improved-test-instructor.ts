// Importamos las funciones test y expect proporcionadas por Playwright Test.
import { test, expect } from '@playwright/test';

// Definimos una prueba independiente cuyo propósito es crear y completar una tarea.
test('crear y completar una tarea', async ({ page }) => {

  // Abrimos la aplicación web que queremos probar.
  await page.goto('http://localhost:4200');

  // Localizamos el campo para capturar una nueva tarea utilizando una referencia semántica.
  const taskInput = page.getByLabel('Nueva tarea');

  // Escribimos el dato que esta misma prueba necesita.
  await taskInput.fill('Preparar capacitación');

  // Localizamos el botón de creación por su rol y por el nombre visible para el usuario.
  const createButton = page.getByRole('button', { name: 'Crear tarea' });

  // Creamos la tarea.
  await createButton.click();

  /*
   * MEJORA 1: NO UTILIZAMOS ESPERAS FIJAS
   *
   * En la prueba anterior utilizábamos waitForTimeout para esperar una cantidad
   * arbitraria de segundos.
   *
   * ¿Cómo lo mejoramos?
   *
   * Esperamos una condición real de la aplicación:
   * que la tarea creada sea visible.
   *
   * Playwright esperará automáticamente hasta que la condición se cumpla
   * o hasta que se alcance el timeout configurado.
   */
  // Localizamos específicamente la tarea que acabamos de crear.
  const taskText = page.getByText('Preparar capacitación');

  // Verificamos que la tarea aparezca en la interfaz.
  await expect(taskText).toBeVisible();

  /*
   * MEJORA 2: UTILIZAMOS UN LOCALIZADOR MÁS ESTABLE
   *
   * En lugar de depender de posiciones como:
   *
   * div:nth-child(2) > button:nth-child(3)
   *
   * ¿Cómo lo mejoramos?
   *
   * Buscamos el control por su rol accesible y por el nombre que representa
   * su función para el usuario.
   *
   * Esto reduce el acoplamiento entre la prueba y la estructura interna del HTML.
   */
  // Localizamos el checkbox encargado de completar específicamente nuestra tarea.
  const completeCheckbox = page.getByRole('checkbox', {
    name: 'Completar Preparar capacitación'
  });

  // Marcamos la tarea como completada.
  await completeCheckbox.check();

  /*
   * MEJORA 3: LA PRUEBA CONTROLA SUS PROPIOS DATOS
   *
   * La prueba anterior utilizaba:
   *
   * page.locator('.task').first()
   *
   * y suponía que ya existía alguna tarea.
   *
   * ¿Cómo lo mejoramos?
   *
   * La propia prueba crea "Preparar capacitación"
   * antes de intentar trabajar con ella.
   *
   * Por lo tanto, el escenario no depende de información dejada
   * previamente por otra ejecución.
   */
  // Localizamos el contenedor correspondiente específicamente a la tarea creada.
  const completedTask = page.locator('.task').filter({
    hasText: 'Preparar capacitación'
  });

  /*
   * MEJORA 4: LA ASERCIÓN COMPRUEBA EL COMPORTAMIENTO REAL
   *
   * La prueba anterior únicamente comprobaba que la tarea continuara visible.
   *
   * Eso no demostraba que realmente hubiera sido completada.
   *
   * ¿Cómo lo mejoramos?
   *
   * Comprobamos explícitamente que el estado de la tarea cambió a "completed".
   */
  // Verificamos el estado real de la tarea después de marcar el checkbox.
  await expect(completedTask).toHaveAttribute('data-status', 'completed');

// Cerramos la definición de la prueba.
});

/*
 * MEJORA 5: LAS PRUEBAS NO DEPENDEN ENTRE SÍ
 *
 * En la versión anterior existía una prueba que creaba una tarea
 * y otra prueba distinta suponía que ese dato seguiría disponible.
 *
 * ¿Cómo lo mejoramos?
 *
 * En esta versión el escenario crea todos los datos que necesita
 * dentro de la misma prueba.
 *
 * Esto permite ejecutar la prueba de manera aislada sin depender
 * del orden de ejecución de otras pruebas.
 */
