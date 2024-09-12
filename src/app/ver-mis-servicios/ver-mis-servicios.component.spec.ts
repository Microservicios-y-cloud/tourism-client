import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMisServiciosComponent } from './ver-mis-servicios.component';

describe('VerMisServiciosComponent', () => {
  let component: VerMisServiciosComponent;
  let fixture: ComponentFixture<VerMisServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerMisServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerMisServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
