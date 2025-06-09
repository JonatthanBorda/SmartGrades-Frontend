import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUsuarioLayoutComponent } from './gestion-usuario-layout.component';

describe('GestionUsuarioLayoutComponent', () => {
  let component: GestionUsuarioLayoutComponent;
  let fixture: ComponentFixture<GestionUsuarioLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionUsuarioLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUsuarioLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
