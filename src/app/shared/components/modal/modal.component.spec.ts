import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalService } from 'src/app/core/services/modal.service';


describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  let _modalService:ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [{ provide: ModalService}],
    })
    .compileComponents();;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    _modalService = TestBed.inject(ModalService);
  });


  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería subscribirse a modalState$ y actualizar isOpen', () => {
    _modalService.openModal('Esta seguro de eliminar el producto prueba?');
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);
    _modalService.closeModal();
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  });

  it('debería subscribirse a message$ y actualizar el mensaje', () => {
    _modalService.openModal('Esta seguro de eliminar el producto prueba?');
    fixture.detectChanges();
    expect(component.message).toBe('Esta seguro de eliminar el producto prueba?');
  });

  it('debería llamar a modalService.accept() cuando se llama onAccept()', () => {
    const spy = jest.spyOn(_modalService, 'accept');
    component.onAccept();
    expect(spy).toHaveBeenCalled();
  });

  it('debería llamar a modalService.cancel() cuando se llama onCancel()', () => {
    const spy = jest.spyOn(_modalService, 'cancel');
    component.onCancel();
    expect(spy).toHaveBeenCalled();
  });
});
