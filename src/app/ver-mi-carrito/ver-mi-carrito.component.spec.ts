import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiCarritoComponent } from './ver-mi-carrito.component';

describe('VerMiCarritoComponent', () => {
  let component: VerMiCarritoComponent;
  let fixture: ComponentFixture<VerMiCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerMiCarritoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerMiCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
