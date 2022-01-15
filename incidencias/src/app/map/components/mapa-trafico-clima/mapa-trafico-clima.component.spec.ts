import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaTraficoClimaComponent } from './mapa-trafico-clima.component';

describe('MapaTraficoClimaComponent', () => {
  let component: MapaTraficoClimaComponent;
  let fixture: ComponentFixture<MapaTraficoClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaTraficoClimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaTraficoClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
