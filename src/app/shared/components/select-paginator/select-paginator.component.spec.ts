import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPaginatorComponent } from './select-paginator.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SelectPaginatorComponent', () => {
  let component: SelectPaginatorComponent;
  let fixture: ComponentFixture<SelectPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPaginatorComponent,FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con opciones de página vacías', () => {
    expect(component.pageSizeOptions).toEqual([]);
  });
  it('debería actualizar selectedPageSize al cambiar el tamaño de página', () => {
    component.pageSizeOptions = [10, 20, 30];
    component.selectedPageSize = 20;
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.value = '30';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.selectedPageSize).toBe(30);
  });
  it('debería emitir pageSizeChange al cambiar el tamaño de página', () => {
    const spy = jest.spyOn(component.pageSizeChange, 'emit');

    component.pageSizeOptions = [10, 20, 30];
    component.selectedPageSize = 20;
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.value = '10';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(10);
  });

});
