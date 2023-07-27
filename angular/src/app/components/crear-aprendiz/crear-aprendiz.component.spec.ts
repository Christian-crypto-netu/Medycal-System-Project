import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAprendizComponent } from './crear-aprendiz.component';

describe('CrearAprendizComponent', () => {
  let component: CrearAprendizComponent;
  let fixture: ComponentFixture<CrearAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAprendizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
