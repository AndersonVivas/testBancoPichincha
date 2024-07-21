import { CommonModule } from '@angular/common';
import { Component,inject, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  private modalService= inject (ModalService);

  isOpen = false;
  message: string = '';

  ngOnInit() {
    this.modalService.modalState$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });

    this.modalService.message$.subscribe(data => {
      this.message = data.message;
    });
  }

  onAccept() {
    this.modalService.accept();
  }

  onCancel() {
    this.modalService.cancel();
  }
}
