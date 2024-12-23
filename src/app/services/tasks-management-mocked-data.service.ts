import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, finalize, Observable, of, tap, throwError } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskListMock } from '../mocks/task-list.mock';
import { TasksManagementServiceInterface } from './interfaces/tasks-management.service.interface';

@Injectable({
              providedIn: 'root',
            })
export class TasksManagementMockedDataService implements TasksManagementServiceInterface {

  isLoading = new BehaviorSubject<boolean>(false);

  constructor() {}

  createTask(task: Task): Observable<Task> {
    const maxId = Math.max(...TaskListMock.map(task => task.id ?? -1));
    task.id = maxId + 1;
    TaskListMock.push(task);
    return of({...task}).pipe(
      tap({ next: () => this.isLoading.next(true) }),
      delay(3000),
      finalize(() => this.isLoading.next(false))
    );
  }

  deleteTaskById(id: number): Observable<null> {
    const taskIndex = TaskListMock.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return throwError(() => new Error('Task not found'));
    }
    TaskListMock.splice(taskIndex, 1);
    return of(null).pipe(
      tap({ next: () => this.isLoading.next(true) }),
      delay(3000),
      finalize(() => this.isLoading.next(false))
    );
  }

  getAllTasks(): Observable<Task[]> {
    return of([...TaskListMock]).pipe(
      tap({ next: () => this.isLoading.next(true) }),
      delay(3000),
      finalize(() => this.isLoading.next(false))
    );
  }

  getTaskById(id: number): Observable<Task> {
    const task = TaskListMock.find(task => task.id === id);
    if (task === undefined) {
      return throwError(() => new Error('Task not found'));
    }
    return of({...task}).pipe(
      tap({ next: () => this.isLoading.next(true) }),
      delay(3000),
      finalize(() => this.isLoading.next(false))
    );
  }

  updateTaskById(task: Task): Observable<Task> {
    const oldTask = TaskListMock.find(t => t.id === task.id);
    if (oldTask === undefined) {
      return throwError(() => new Error('Task not found'));
    }
    oldTask.title = task.title;
    oldTask.description = task.description;
    oldTask.status = task.status;
    return of({...oldTask}).pipe(
      tap({ next: () => this.isLoading.next(true) }),
      delay(3000),
      finalize(() => this.isLoading.next(false))
    );
  }

}
