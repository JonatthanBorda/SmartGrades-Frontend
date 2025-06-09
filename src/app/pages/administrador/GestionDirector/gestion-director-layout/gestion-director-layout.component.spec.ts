import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDirectorLayoutComponent } from './gestion-director-layout.component';

describe('GestionDirectorLayoutComponent', () => {
  let component: GestionDirectorLayoutComponent;
  let fixture: ComponentFixture<GestionDirectorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDirectorLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDirectorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
