import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitadoLayoutComponent } from './invitado-layout.component';

describe('InvitadoLayoutComponent', () => {
  let component: InvitadoLayoutComponent;
  let fixture: ComponentFixture<InvitadoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitadoLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitadoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
