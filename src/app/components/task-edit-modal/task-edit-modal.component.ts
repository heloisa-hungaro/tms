import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskStatuses } from '../../enums/task-statuses.enum';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit-modal',
             imports: [
               CommonModule,
               FormsModule,
               ReactiveFormsModule
             ],
  templateUrl: './task-edit-modal.component.html'
})
export class TaskEditModalComponent implements OnInit {

  @Input() task: Task | undefined;
  @Input() orderedStatuses!: { title: string; status: TaskStatuses }[];

  @Output() modalCloseEvent = new EventEmitter<{ canceled: boolean, task?: Task | undefined, isNew?: boolean}>();

  isNewTask = false;

  editForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(TaskStatuses.TO_DO)
   });

  ngOnInit() {
    if (this.task === undefined) {
      this.isNewTask = true;
      this.task = new Task('' , '', TaskStatuses.TO_DO);
    } else {
      this.editForm.controls.title.setValue(this.task.title);
      this.editForm.controls.description.setValue(this.task.description);
      this.editForm.controls.status.setValue(this.task.status);
    }
  }

  confirmEdition() {
    if (this.task) {
      this.task.title = this.editForm.controls.title.value ?? '';
      this.task.description = this.editForm.controls.description.value ?? '';
      this.task.status = this.editForm.controls.status.value ?? TaskStatuses.TO_DO;
    }
    this.modalCloseEvent.emit({ canceled: false, task: this.task, isNew: this.isNewTask });
  }

  cancelEdition() {
    this.modalCloseEvent.emit({ canceled: true });
  }
}
