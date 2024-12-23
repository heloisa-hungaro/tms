import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { TasksManagementMockedDataService } from './tasks-management-mocked-data.service';
import { TasksManagementServiceInterface } from './interfaces/tasks-management.service.interface';

@Injectable({
              providedIn: 'root',
            })
export class TasksManagementService implements TasksManagementServiceInterface {

  apiBaseUrl = 'http://localhost:3000';

  constructor(protected httpClient: HttpClient,
              protected mockedDataService: TasksManagementMockedDataService) {
  }

  createTask(task: Task): Observable<Task> {
    // send a POST request to the server to create a new task
    // the server will return the created task with its id
    return this.httpClient.post<Task>('${this.apiBaseUrl}/tasks', task);
  }

  deleteTaskById(id: number): Observable<null> {
    // send a DELETE request to the server to delete the task with the given id
    // the server will return a response with an empty body
    return this.httpClient.delete<null>(`${this.apiBaseUrl}/tasks/${id}`);
  }

  getAllTasks(): Observable<Task[]> {
    // send a GET request to the server to get all tasks in an array
    return this.httpClient.get<Task[]>(`${this.apiBaseUrl}/tasks`);
  }

  getTaskById(id: number): Observable<Task> {
    // send a GET request to the server to get the task with the given id
    return this.httpClient.get<Task>(`${this.apiBaseUrl}/tasks/${id}`);
  }

  updateTaskById(task: Task): Observable<Task> {
    // send a PUT request to the server to update the task with the given id
    // the server will return the updated task in the response body
    return this.httpClient.put<Task>(`${this.apiBaseUrl}/tasks/${task.id}`, task);
  }

}
