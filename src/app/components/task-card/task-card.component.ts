import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html'
})
export class TaskCardComponent {

  @Input() task: Task | undefined;

  @Output() removeTaskEvent = new EventEmitter<Task>();
  @Output() editTaskEvent = new EventEmitter<Task>();

  editTask() {
    this.editTaskEvent.emit(this.task);
  }

  removeTask() {
    this.removeTaskEvent.emit(this.task);
  }
}
