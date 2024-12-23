import { TaskStatuses } from '../enums/task-statuses.enum';

export class Task {
  id?: number; // optional because it is not required when creating a new task
  title: string;
  description: string;
  status: TaskStatuses;

  constructor(title: string, description: string, status: TaskStatuses, id?: number) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.id = id;
  }

}
