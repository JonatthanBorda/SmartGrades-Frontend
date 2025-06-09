import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProfesorComponent } from './lista-profesor.component';

describe('ListaPaisComponent', () => {
  let component: ListaProfesorComponent;
  let fixture: ComponentFixture<ListaProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
