import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNotaComponent } from './formulario-nota.component';

describe('FormularioPeliculaComponent', () => {
  let component: FormularioNotaComponent;
  let fixture: ComponentFixture<FormularioNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioNotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
