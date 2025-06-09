import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDirectorComponent } from './formulario-director.component';

describe('FormularioDirectorComponent', () => {
  let component: FormularioDirectorComponent;
  let fixture: ComponentFixture<FormularioDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDirectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
