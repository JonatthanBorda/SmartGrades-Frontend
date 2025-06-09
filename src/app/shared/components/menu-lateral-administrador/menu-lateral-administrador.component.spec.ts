import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralAdministradorComponent } from './menu-lateral-administrador.component';

describe('MenuLateralAdministradorComponent', () => {
  let component: MenuLateralAdministradorComponent;
  let fixture: ComponentFixture<MenuLateralAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuLateralAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLateralAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
