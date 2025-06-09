import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGeneroComponent } from './lista-genero.component';

describe('ListaGeneroComponent', () => {
  let component: ListaGeneroComponent;
  let fixture: ComponentFixture<ListaGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaGeneroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
