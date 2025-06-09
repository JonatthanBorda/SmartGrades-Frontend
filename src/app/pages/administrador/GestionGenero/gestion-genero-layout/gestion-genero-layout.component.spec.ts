import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGeneroLayoutComponent } from './gestion-genero-layout.component';

describe('GestionGeneroLayoutComponent', () => {
  let component: GestionGeneroLayoutComponent;
  let fixture: ComponentFixture<GestionGeneroLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionGeneroLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionGeneroLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
