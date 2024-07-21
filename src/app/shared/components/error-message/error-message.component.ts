import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css'
})
export class ErrorMessageComponent {

  @Input() control: AbstractControl | null = null;
  @Input() errorType: string = '';
  @Input() message: string = '';

  shouldShowError(): boolean {
    return !!this.control?.hasError(this.errorType) && this.control?.touched;
  }
}
