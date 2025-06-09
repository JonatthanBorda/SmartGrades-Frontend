import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPaisComponent } from './formulario-pais.component';

describe('FormularioPaisComponent', () => {
  let component: FormularioPaisComponent;
  let fixture: ComponentFixture<FormularioPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
