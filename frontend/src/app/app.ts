import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
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
export class App implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/tasks';

  protected readonly tasks = signal<Task[]>([]);
  protected readonly newTask = signal('');

  protected readonly pendingCount = computed(
    () => this.tasks().filter(task => !task.completed).length
  );

  protected readonly completedCount = computed(
    () => this.tasks().filter(task => task.completed).length
  );

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe(tasks => {
      this.tasks.set(tasks);
    });
  }

  protected updateNewTask(value: string): void {
    this.newTask.set(value);
  }

  protected createTask(): void {
    const title = this.newTask().trim();

    if (!title) {
      return;
    }

    this.http.post<Task>(this.apiUrl, { title }).subscribe(task => {
      this.tasks.update(tasks => [...tasks, task]);
      this.newTask.set('');
    });
  }

  protected toggleTask(id: number): void {
    const task = this.tasks().find(item => item.id === id);

    if (!task) {
      return;
    }

    this.http.patch<Task>(
      this.apiUrl + '/' + id,
      { completed: !task.completed }
    ).subscribe(updatedTask => {
      this.tasks.update(tasks =>
        tasks.map(item =>
          item.id === id
            ? updatedTask
            : item
        )
      );
    });
  }

  protected deleteTask(id: number): void {
    this.http.delete<void>(this.apiUrl + '/' + id).subscribe(() => {
      this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    });
  }
}
