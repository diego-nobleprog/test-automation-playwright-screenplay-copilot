import { test, expect } from '@playwright/test';

test('preparar por API, actuar por UI y verificar por API', async ({ page, request }) => {
  const apiUrl = 'http://localhost:8080/api/tasks';
  const title = 'P7 API UI ' + Date.now();

  let taskId: number | undefined;

  try {
    const createResponse = await request.post(apiUrl, {
      data: { title }
    });

    expect(createResponse.status()).toBe(201);

    const createdTask = await createResponse.json();
    taskId = createdTask.id;

    expect(createdTask.title).toBe(title);
    expect(createdTask.completed).toBe(false);

    await page.goto('http://localhost:4200');

    const task = page.locator('article.task').filter({ hasText: title });

    await expect(task).toBeVisible();
    await expect(task).toHaveAttribute('data-status', 'pending');

    await task.getByRole('checkbox').check();

    await expect(task).toHaveAttribute('data-status', 'completed');

    const verifyResponse = await request.get(apiUrl + '/' + taskId);

    expect(verifyResponse.status()).toBe(200);

    const verifiedTask = await verifyResponse.json();

    expect(verifiedTask.id).toBe(taskId);
    expect(verifiedTask.title).toBe(title);
    expect(verifiedTask.completed).toBe(true);
  } finally {
    if (taskId !== undefined) {
      await request.delete(apiUrl + '/' + taskId);
    }
  }
});
