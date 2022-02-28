import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaContaminacionComponent } from './mapa-contaminacion.component';

describe('MapaContaminacionComponent', () => {
  let component: MapaContaminacionComponent;
  let fixture: ComponentFixture<MapaContaminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaContaminacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaContaminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
