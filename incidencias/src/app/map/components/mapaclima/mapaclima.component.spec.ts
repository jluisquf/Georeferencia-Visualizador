import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaclimaComponent } from './mapaclima.component';

describe('MapaclimaComponent', () => {
  let component: MapaclimaComponent;
  let fixture: ComponentFixture<MapaclimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaclimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaclimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
