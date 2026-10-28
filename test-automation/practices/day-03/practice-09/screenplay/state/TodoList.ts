import {
  By,
  PageElement,
} from '@serenity-js/web';

export const TodoList = {
  taskWithId: (id: number) =>
    PageElement
      .located(
        By.css('[data-testid="task-' + id + '"]'),
      )
      .describedAs(`task with id ${ id }`),

  deleteButtonFor: (id: number, title: string) =>
    PageElement
      .located(
        By.css(
          '[data-testid="task-' + id + '"] button[aria-label="Eliminar ' + title + '"]',
        ),
      )
      .describedAs(`delete button for task ${ id }`),
};
