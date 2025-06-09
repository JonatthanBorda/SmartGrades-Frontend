import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDirectorComponent } from './lista-director.component';

describe('ListaDirectorComponent', () => {
  let component: ListaDirectorComponent;
  let fixture: ComponentFixture<ListaDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDirectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
