import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sort } from '../../types/sort.type';

@Component({
  selector: 'app-filters',
             imports: [
               CommonModule,
               ReactiveFormsModule
             ],
  templateUrl: './filters.component.html'
})
export class FiltersComponent {

  @Output() filterTasksEvent = new EventEmitter<{ title: string, description: string }>();

  @Input() sort: Sort = 'ASC';
  @Output() sortChange = new EventEmitter<'ASC' | 'DESC'>();

  filterForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  clearFilters() {
    this.filterForm.controls.title.setValue('');
    this.filterForm.controls.description.setValue('');
    this.filterTasks();
  }

  filterTasks() {
    this.filterTasksEvent.emit({
       title: this.filterForm.controls.title.value?.trim() ?? '',
       description: this.filterForm.controls.description.value?.trim() ?? ''
    });
  }

  toggleSort() {
    console.log(this.sort);
    this.sort = this.sort === 'ASC' ? 'DESC' : 'ASC';
    this.sortChange.emit(this.sort);
  }
}
