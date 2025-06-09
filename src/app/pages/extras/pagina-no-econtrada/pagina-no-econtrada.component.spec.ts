import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNoEcontradaComponent } from './pagina-no-econtrada.component';

describe('PaginaNoEcontradaComponent', () => {
  let component: PaginaNoEcontradaComponent;
  let fixture: ComponentFixture<PaginaNoEcontradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNoEcontradaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaNoEcontradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
