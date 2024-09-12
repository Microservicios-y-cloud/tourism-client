import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerServiciosCompradosComponent } from './ver-servicios-comprados.component';

describe('VerServiciosCompradosComponent', () => {
  let component: VerServiciosCompradosComponent;
  let fixture: ComponentFixture<VerServiciosCompradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerServiciosCompradosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerServiciosCompradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
