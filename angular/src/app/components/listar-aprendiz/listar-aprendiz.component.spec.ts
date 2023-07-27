import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAprendizComponent } from './listar-aprendiz.component';

describe('ListarAprendizComponent', () => {
  let component: ListarAprendizComponent;
  let fixture: ComponentFixture<ListarAprendizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAprendizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
