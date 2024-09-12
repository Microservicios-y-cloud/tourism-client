import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPrincipalProveedorComponent } from './menu-principal-proveedor.component';

describe('MenuPrincipalProveedorComponent', () => {
  let component: MenuPrincipalProveedorComponent;
  let fixture: ComponentFixture<MenuPrincipalProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuPrincipalProveedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuPrincipalProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
