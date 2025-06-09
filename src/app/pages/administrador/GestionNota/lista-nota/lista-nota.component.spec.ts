import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotaComponent } from './lista-nota.component';

describe('ListaPeliculaComponent', () => {
  let component: ListaNotaComponent;
  let fixture: ComponentFixture<ListaNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaNotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
