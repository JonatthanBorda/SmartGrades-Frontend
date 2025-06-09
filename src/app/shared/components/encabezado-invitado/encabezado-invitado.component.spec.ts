import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoInvitadoComponent } from './encabezado-invitado.component';

describe('EncabezadoInvitadoComponent', () => {
  let component: EncabezadoInvitadoComponent;
  let fixture: ComponentFixture<EncabezadoInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoInvitadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
