// Importa las herramientas Screenplay para localizar elementos web.
import {
  By,
  PageElement,
} from '@serenity-js/web';

// Representa los elementos observables de una tarea en la UI.
export const TodoList = {

  // Localiza directamente una tarea usando el id generado por el backend.
  taskWithId: (id: number) =>
    PageElement
      .located(
        By.css('[data-testid="task-' + id + '"]'),
      )
      .describedAs(`task with id ${ id }`),

  // Localiza el checkbox nativo dentro de la tarea especifica.
  checkboxFor: (id: number) =>
    PageElement
      .located(
        By.css(
          '[data-testid="task-' + id + '"] input[type="checkbox"]'
        ),
      )
      .describedAs(`checkbox for task ${ id }`),
};
