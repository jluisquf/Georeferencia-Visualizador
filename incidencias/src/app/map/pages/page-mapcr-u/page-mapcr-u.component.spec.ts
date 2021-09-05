import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMapcrUComponent } from './page-mapcr-u.component';

describe('PageMapcrUComponent', () => {
  let component: PageMapcrUComponent;
  let fixture: ComponentFixture<PageMapcrUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMapcrUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMapcrUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
