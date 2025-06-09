import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActorComponent } from './formulario-actor.component';

describe('FormularioActorComponent', () => {
  let component: FormularioActorComponent;
  let fixture: ComponentFixture<FormularioActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioActorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
