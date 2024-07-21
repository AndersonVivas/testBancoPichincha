import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-paginator',
  standalone: true,
  imports: [ CommonModule,FormsModule],
  templateUrl: './select-paginator.component.html',
  styleUrl: './select-paginator.component.css'
})
export class SelectPaginatorComponent {

  @Input() pageSizeOptions: number[] = [];
  @Input() selectedPageSize: number = this.pageSizeOptions[1];
  @Input() lengthElements: number = 0;
  @Output() pageSizeChange = new EventEmitter<number>();

  onPageSizeChange(event: Event) {
    this.selectedPageSize = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(this.selectedPageSize);
  }

}
