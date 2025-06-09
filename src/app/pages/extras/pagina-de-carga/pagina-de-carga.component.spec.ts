import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDeCargaComponent } from './pagina-de-carga.component';

describe('PaginaDeCargaComponent', () => {
  let component: PaginaDeCargaComponent;
  let fixture: ComponentFixture<PaginaDeCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaDeCargaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaDeCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
