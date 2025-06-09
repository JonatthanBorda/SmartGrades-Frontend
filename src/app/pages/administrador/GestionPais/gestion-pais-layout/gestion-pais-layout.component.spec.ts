import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPaisLayoutComponent } from './gestion-pais-layout.component';

describe('GestionPaisLayoutComponent', () => {
  let component: GestionPaisLayoutComponent;
  let fixture: ComponentFixture<GestionPaisLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPaisLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPaisLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
