import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaCallesReportadasUsuariosComponent } from './mapa-calles-reportadas-usuarios.component';

describe('MapaCallesReportadasUsuariosComponent', () => {
  let component: MapaCallesReportadasUsuariosComponent;
  let fixture: ComponentFixture<MapaCallesReportadasUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaCallesReportadasUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaCallesReportadasUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
