import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPeliculaLayoutComponent } from './gestion-pelicula-layout.component';

describe('GestionPeliculaLayoutComponent', () => {
  let component: GestionPeliculaLayoutComponent;
  let fixture: ComponentFixture<GestionPeliculaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPeliculaLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPeliculaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
