import { TestBed, ComponentFixture} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of} from 'rxjs';
import { ProductFormComponent } from './product-form.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from 'src/app/core/services/product/product.service';
import { ProductFormService } from 'src/app/core/services/product/productForm.service';
import { FormInputComponent } from 'src/app/shared/components/form-input/form-input.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ValidationService } from 'src/app/core/services/validation.service';


describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let activatedRoute: ActivatedRoute;
  let productFormService: ProductFormService;
  let productService: ProductService;
  let router: Router;

  const productServiceMock = {
    getProduct: jest.fn().mockReturnValue(of({ id: '1', logo: 'probando', description: 'probando', name: 'Producto de Prueba', date_revision: '2024-01-01', date_release: '2024-01-01' })),
    addProduct: jest.fn().mockReturnValue(of({ message: 'Product added successfully', datta: { id: '1', logo: 'probando', description: 'probando', name: 'Producto de Prueba', date_revision: '2024-01-01', date_release: '2024-01-01' } })),
    updateProduct: jest.fn().mockReturnValue(of({ message: 'Product updated successfully' })),
    validateProductExist: jest.fn().mockReturnValue(of(true))
  };
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, ReactiveFormsModule, RouterModule, CommonModule, FormInputComponent, DatePipe
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: ProductFormService },
        { provide: Router },
        { provide: DatePipe },
        { provide: ValidationService },
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of({ get: (key: string) => 1 }),
          },
        }
      ],
    }).compileComponents();

    activatedRoute = TestBed.inject(ActivatedRoute);
    productFormService = TestBed.inject(ProductFormService);
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getAction y suscribeDateRealease al inicializar', () => {
    const spyGetAction = jest.spyOn(component, 'getAction');
    const spySuscribeDateRealease = jest.spyOn(component, 'suscribeDateRealease');
    component.ngOnInit();
    expect(spyGetAction).toHaveBeenCalled();
    expect(spySuscribeDateRealease).toHaveBeenCalled();
  });


  it('debería establecer isEdit en true y llamar a getProduct si productId está presente', () => {
    const spyGetProduct = jest.spyOn(component, 'getProduct');
    component.getAction();
    expect(component.isEdit).toBe(true);
    expect(spyGetProduct).toHaveBeenCalled();
  });
  describe('getProduct', () => {
    it('debería actualizar el formulario con los datos del producto y deshabilitar el control id', () => {
      const mockProduct = { logo: 'probando', description: 'probando', name: 'Producto de Prueba', date_release: '2024-01-01' };
      component.getProduct();
      expect(component.formProduct.value).toEqual(mockProduct);
      expect(component.formProduct.get('id')?.disabled).toBe(true);
      expect(component.formProduct.get('date_revision')?.disabled).toBe(true);
    });
  });

  describe('save', () => {
    it('debería llamar a addProduct si isEdit es false', () => {
      component.isEdit = false;
      const spyNavigate = jest.spyOn(router, 'navigate');
      component.save();
      expect(productServiceMock.addProduct).toHaveBeenCalled();
      expect(spyNavigate).toHaveBeenCalledWith(['/products']);
    });

    it('debería llamar a updateProduct si isEdit es true', () => {
      component.isEdit = true;
      const spyNavigate = jest.spyOn(router, 'navigate');

      component.save();

      expect(productServiceMock.updateProduct).toHaveBeenCalled();
      expect(spyNavigate).toHaveBeenCalledWith(['/products']);
    });
  });

  describe('actionReiniciar', () => {
    it('debería llamar a getProduct si isEdit es true', () => {
      component.isEdit = true;
      const spyGetProduct = jest.spyOn(component, 'getProduct');

      component.actionReiniciar();

      expect(productServiceMock.getProduct).toHaveBeenCalled();
    });

    it('debería llamar a resetForm si isEdit es false', () => {
      component.isEdit = false;
      const spyResetForm = jest.spyOn(component, 'resetForm');

      component.actionReiniciar();

      expect(component.resetForm).toHaveBeenCalled();
    });
  });
  describe('resetForm', () => {
    it('debería reiniciar el formulario', () => {
      component.resetForm();
      expect(component.formProduct.value).toEqual({ id: null, logo: null, description: null, name: null, date_release: null });
    });
  });
  describe('suscribeDateRealease', () => {
    it('debería llamar a updateDateRevision cuando cambie la fecha de liberación', () => {
      const mockDate = '2024-01-01';
      const spyUpdateDateRevision = jest.spyOn(productFormService, 'updateDateRevision');

      component.suscribeDateRealease();
      component.formProduct.get('date_release')?.setValue(mockDate);

      expect(productFormService.updateDateRevision).toHaveBeenCalledWith(component.formProduct, mockDate);
    });
  });

});