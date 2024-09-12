import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPrincipalClienteComponent } from './menu-principal-cliente.component';

describe('MenuPrincipalClienteComponent', () => {
  let component: MenuPrincipalClienteComponent;
  let fixture: ComponentFixture<MenuPrincipalClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuPrincipalClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuPrincipalClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
