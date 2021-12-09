import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMapcliComponent } from './page-mapcli.component';

describe('PageMapcliComponent', () => {
  let component: PageMapcliComponent;
  let fixture: ComponentFixture<PageMapcliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMapcliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMapcliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
