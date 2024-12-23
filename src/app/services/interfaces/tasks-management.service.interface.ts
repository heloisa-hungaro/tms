import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
              providedIn: 'root',
            })
export abstract class TasksManagementServiceInterface {

  abstract createTask(task: Task): Observable<Task>;

  abstract deleteTaskById(id: number): Observable<null>;

  abstract getAllTasks(): Observable<Task[]>;

  abstract getTaskById(id: number): Observable<Task>;

  abstract updateTaskById(task: Task): Observable<Task>;

}
