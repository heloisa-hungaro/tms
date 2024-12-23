import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskStatuses } from '../../enums/task-statuses.enum';
import { TaskCardComponent } from '../task-card/task-card.component';
import { FiltersComponent } from '../filters/filters.component';
import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';
import { Sort } from '../../types/sort.type';
import { TasksManagementMockedDataService } from '../../services/tasks-management-mocked-data.service';

@Component({
  selector: 'app-dashboard',
             imports: [
               CommonModule,
               TaskCardComponent,
               FiltersComponent,
               TaskEditModalComponent
             ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  protected readonly orderedStatuses: { title: string, status: TaskStatuses }[] = [
    { title: 'To Do', status: TaskStatuses.TO_DO },
    { title: 'In Progress', status: TaskStatuses.IN_PROGRESS },
    { title: 'Done', status: TaskStatuses.DONE }
  ];

  private _allTasks: Task[] = [];
  private _sort: Sort = 'ASC';

  indexedTasks: { [key: string]: Task[] } = {};
  isEditing = false;
  isLoading = false;
  taskInEdit: Task | undefined;

  constructor(protected taskManagementService: TasksManagementMockedDataService /*TasksManagementService*/ ) { }

  ngOnInit(): void {
    this.taskManagementService.isLoading.subscribe((isLoading) => this.isLoading = isLoading);
    this.getAllTasks();
  }

  set sort(sort: Sort) {
    this._sort = sort;
    this.allTasks = this.allTasks.sort((a, b) => sort === 'ASC' ? (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1) : (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1));
  }

  get sort(): Sort {
    return this._sort;
  }

  get allTasks(): Task[] {
    return this._allTasks;
  }

  set allTasks(value: Task[]) {
    this._allTasks = value;
    if (!value) {
      return;
    }
    for (let status in TaskStatuses) {
      this.indexedTasks[status] = this.allTasks.filter(task => task.status === status);
    }
  }

  getAllTasks(filter?: { title: string; description: string }) {
    this.taskManagementService.getAllTasks().subscribe({
       next: (tasks: Task[]) => {
         this.allTasks = tasks;
         if(filter) {
           this.allTasks = this.allTasks.filter(task => task.title.toLowerCase().includes(filter.title.toLowerCase()) && task.description.toLowerCase().includes(filter.description.toLowerCase()));
         }
         this.sort = 'ASC';
       },
       error: (error: any) => {
         this.allTasks = [];
         console.log(error);
       }
    });
  }

  removeTask(task: Task) {
    this.taskManagementService.deleteTaskById(task.id ?? -1).subscribe({
       next: () => this.getAllTasks(),
       error: (error: any) => {
         console.log(error);
       }
    });
  }

  editTask(task: Task | undefined) {
    this.taskInEdit = task;
    this.isEditing = true;
  }

  onTaskEditModalClose(canceled: boolean, task?: Task | undefined, isNew?: boolean) {
    this.isEditing = false;
    this.taskInEdit = undefined;
    if (!canceled && task) {
      const serviceApiCall = isNew ? this.taskManagementService.createTask(task) : this.taskManagementService.updateTaskById(task);
      serviceApiCall.subscribe({
         next: () => this.getAllTasks(),
         error: (error: any) => {
           console.log(error);
         }
      });
    }
  }


}
