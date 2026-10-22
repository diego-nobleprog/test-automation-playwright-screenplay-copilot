import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly tasks = signal<Task[]>([]);
  protected readonly newTask = signal('');

  protected readonly pendingCount = computed(
    () => this.tasks().filter(task => !task.completed).length
  );

  protected readonly completedCount = computed(
    () => this.tasks().filter(task => task.completed).length
  );

  protected updateNewTask(value: string): void {
    this.newTask.set(value);
  }

  protected createTask(): void {
    const title = this.newTask().trim();

    if (!title) {
      return;
    }

    this.tasks.update(tasks => [
      ...tasks,
      {
        id: Date.now(),
        title,
        completed: false
      }
    ]);

    this.newTask.set('');
  }

  protected toggleTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  protected deleteTask(id: number): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }
}
