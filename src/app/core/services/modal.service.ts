import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  modalState$ = this.modalState.asObservable();

  private responseSubject = new Subject<boolean>();
  response$ = this.responseSubject.asObservable();

  private messageSubject = new Subject<{ message: string }>();
  message$ = this.messageSubject.asObservable();

  openModal( message: string): Observable<boolean> {
    this.messageSubject.next({message });
    this.modalState.next(true);
    return this.response$;
  }

  closeModal() {
    this.modalState.next(false);
  }

  accept() {
    this.responseSubject.next(true);
    this.closeModal();
  }

  cancel() {
    this.responseSubject.next(false);
    this.closeModal();
  }
}