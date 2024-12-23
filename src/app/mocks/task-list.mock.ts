import { Task } from '../models/task.model';
import { TaskStatuses } from '../enums/task-statuses.enum';

export const TaskListMock: Task[] = [
  { id: 1, title: 'Clean the kitchen', description: 'Wash dishes, wipe counters, and mop the floor', status: TaskStatuses.TO_DO },
  { id: 2, title: 'Vacuum the living room', description: 'Vacuum the carpet and dust the furniture', status: TaskStatuses.IN_PROGRESS },
  { id: 3, title: 'Laundry', description: 'Wash, dry, and fold clothes', status: TaskStatuses.DONE },
  { id: 4, title: 'Grocery shopping', description: 'Buy groceries for the week', status: TaskStatuses.TO_DO },
  { id: 5, title: 'Clean the bathroom', description: 'Scrub the toilet, sink, and shower', status: TaskStatuses.IN_PROGRESS },
  { id: 6, title: 'Mow the lawn', description: 'Mow the front and back yard', status: TaskStatuses.DONE },
  { id: 7, title: 'Take out the trash', description: 'Empty all trash bins and take the trash to the curb', status: TaskStatuses.TO_DO },
  { id: 8, title: 'Organize the garage', description: 'Sort and organize items in the garage', status: TaskStatuses.IN_PROGRESS },
  { id: 9, title: 'Clean the windows', description: 'Wash all windows inside and out', status: TaskStatuses.DONE },
  { id: 10, title: 'Dust the bedrooms', description: 'Dust all surfaces in the bedrooms', status: TaskStatuses.TO_DO }
];
