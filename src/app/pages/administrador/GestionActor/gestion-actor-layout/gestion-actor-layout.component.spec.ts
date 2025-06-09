import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionActorLayoutComponent } from './gestion-actor-layout.component';

describe('GestionActorLayoutComponent', () => {
  let component: GestionActorLayoutComponent;
  let fixture: ComponentFixture<GestionActorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionActorLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionActorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
