// Importa Playwright Test y las assertions.
import { test, expect } from '@playwright/test';

// Define una prueba que combina API y UI.
test('preparar por API, actuar por UI y verificar por API', async ({ page, request }) => {

  // Define el endpoint utilizado para trabajar con tareas.
  const apiUrl = 'http://localhost:8080/api/tasks';

  // Genera un titulo unico para mantener independencia entre ejecuciones.
  const title = 'P7 API UI ' + Date.now();

  // Guarda el id generado por el backend para verificar y limpiar la tarea.
  let taskId: number | undefined;

  // Protege la prueba para ejecutar el cleanup aunque una validacion falle.
  try {

    // Crea directamente por API el dato necesario para la prueba.
    const createResponse = await request.post(apiUrl, {

      // Envia el titulo como cuerpo JSON.
      data: { title },
    });

    // Verifica que la API responda HTTP 201 Created.
    expect(createResponse.status()).toBe(201);

    // Convierte la respuesta HTTP a JSON.
    const createdTask = await createResponse.json();

    // Guarda el identificador real generado por el backend.
    taskId = createdTask.id;

    // Verifica que se haya generado un id valido.
    expect(createdTask.id).toBeGreaterThan(0);

    // Verifica que el titulo persistido sea el esperado.
    expect(createdTask.title).toBe(title);

    // Verifica que una tarea nueva comience como pendiente.
    expect(createdTask.completed).toBe(false);

    // Abre la aplicacion Angular.
    await page.goto('http://localhost:4200');

    // Localiza solamente la tarjeta correspondiente a la tarea creada.
    const task = page
      .locator('article.task')
      .filter({ hasText: title });

    // Verifica que la tarea creada por API aparezca en la UI.
    await expect(task).toBeVisible();

    // Verifica que inicialmente este pendiente.
    await expect(task).toHaveAttribute('data-status', 'pending');

    // Completa la tarea desde la interfaz.
    await task
      .getByRole('checkbox')
      .check();

    // Verifica que la UI refleje el nuevo estado.
    await expect(task).toHaveAttribute('data-status', 'completed');

    // Consulta nuevamente la tarea directamente por API.
    const verifyResponse = await request.get(
      apiUrl + '/' + taskId
    );

    // Verifica que la consulta responda HTTP 200.
    expect(verifyResponse.status()).toBe(200);

    // Convierte la respuesta de verificacion a JSON.
    const verifiedTask = await verifyResponse.json();

    // Verifica que corresponda con la misma tarea creada al inicio.
    expect(verifiedTask.id).toBe(taskId);

    // Verifica que el titulo siga siendo el esperado.
    expect(verifiedTask.title).toBe(title);

    // Verifica que el cambio realizado desde la UI haya sido persistido.
    expect(verifiedTask.completed).toBe(true);

  // Ejecuta la limpieza tanto si la prueba pasa como si falla.
  } finally {

    // Solo intenta eliminar cuando la tarea realmente fue creada.
    if (taskId !== undefined) {

      // Elimina por API el dato creado exclusivamente para esta prueba.
      await request.delete(
        apiUrl + '/' + taskId
      );
    }
  }
});
