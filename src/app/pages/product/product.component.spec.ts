import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from 'src/app/core/services/product/product.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';

const productServiceMock = {
  getProducts: jest.fn().mockReturnValue(of({ data: [{ id: 'dos', logo: 'probando', description: 'probando', name: 'Producto de Prueba', date_revision: '01/01/2024', date_release: '01/01/2024' }] })),
  deleteProduct: jest.fn().mockReturnValue(of({}))
};

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let modalService:ModalService;
  let router:Router;
  let responseSubject: Subject<boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductComponent,RouterModule, CommonModule  ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: ModalService},
        { provide: Router, useValue: { navigate: jest.fn() } },
        {provide: ActivatedRoute, useValue: {
          paramMap: of({ get: (key: string) => 1 }),
        },}
      ]
    }).compileComponents();
    modalService=TestBed.inject(ModalService);
    router=TestBed.inject(Router);
    
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con productos', () => {
    component.ngOnInit();

    expect(component.dataArray).toEqual([{ id: 'dos', logo: 'probando', description: 'probando', name: 'Producto de Prueba', date_revision: '01/01/2024', date_release: '01/01/2024' }]);
    expect(component.lengthData).toBe(1);
    expect(component.listProducts).toEqual([{ id: 'dos', logo: 'probando', description: 'probando', name: 'Producto de Prueba', date_revision: '01/01/2024', date_release: '01/01/2024' }]);
  });
  it('debería navegar a la ruta de edición del producto', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const productId = 'dos';
    component.editProduct(productId);
    expect(navigateSpy).toHaveBeenCalledWith(['/products/edit', productId]);
  });

  it('debería actualizar listProducts en los cambios de valor del control de búsqueda', () => {
    component.dataArray = [{ id: 'dos', logo: 'probando', description: 'probando', name: 'Producto de Prueba', date_revision: '01/01/2024', date_release: '01/01/2024' }, { id: 'tres', logo: 'probandotres', description: 'probandotres', name: 'Producto de Prueba', date_revision: '01/01/2024', date_release: '01/01/2024' }];
    component.sizeOfData = 2;

    component.searchControl.setValue('Producto de Prueba');

    expect(component.listProducts).toEqual(component.dataArray.filter(product =>
      Object.values(product).some(val => val.toString().toLowerCase().includes('producto de prueba'))
    ).slice(0, component.sizeOfData));
  });

  it('debería cambiar listProducts en el cambio de tamaño de página', () => {
    component.dataArray = [{ id: 'dos', logo: 'probando', description: 'probando', name: 'Producto de Prueba', date_revision: '01/01/2024', date_release: '01/01/2024' }, { id: 'tres', logo: 'probandotres', description: 'probandotres', name: 'Producto de Prueba', date_revision: '01/01/2024', date_release: '01/01/2024' }];
    component.sizeOfData = 1;

    component.onPageSizeChange(2);

    expect(component.sizeOfData).toBe(2);
    expect(component.listProducts).toEqual(component.dataArray.slice(0, 2));
  });
  it('debería filtrar productos basados en la consulta', () => {
    component.dataArray = [{ id: 'dos', logo: 'probando', description: 'probando', name: 'Producto de Prueba', date_revision: '01/01/2024', date_release: '01/01/2024' }, { id: 'tres', logo: 'probandotres', description: 'probandotres', name: 'probrandotres', date_revision: '01/01/2024', date_release: '01/01/2024' }];

    const result = component.filterArray('probandotres');

    expect(result).toEqual(component.dataArray.filter(product =>
      Object.values(product).some(val => val.toString().toLowerCase().includes('probandotres'))
    ));
  });
  

  it('debería eliminar el producto si el usuario acepta la eliminación', () => {
    const productId = 'dos';
    const productName = 'Producto de Prueba';
    const spy = jest.spyOn(modalService, 'openModal');
    component.deleteProduct(productId, productName);
    expect(spy).toHaveBeenCalledWith(`Está seguro de eliminar el producto ${productName} ?`);
    modalService.accept();
    fixture.detectChanges();
    expect(productServiceMock.deleteProduct).toHaveBeenCalledWith(productId);   
  });

  it('no debería eliminar el producto si el usuario cancela la eliminación', () => {
    const productId = 'dos';
    const productName = 'Producto de Prueba';
    const spy = jest.spyOn(modalService, 'openModal');
    const spycancell = jest.spyOn(modalService, 'cancel');
    component.deleteProduct(productId, productName);
    expect(spy).toHaveBeenCalledWith(`Está seguro de eliminar el producto ${productName} ?`);
    modalService.cancel();
    fixture.detectChanges();      
    expect(spycancell).toHaveBeenCalled();
  });
  it('debería alternar el menú activo', () => {
    const event = new MouseEvent('click');
    const id = 'menu1';

    component.toggleMenu(event, id);
    expect(component.activeMenu).toBe(id);

    component.toggleMenu(event, id);
    expect(component.activeMenu).toBe(null);
  });

});
