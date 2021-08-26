import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMapcrComponent } from './page-mapcr.component';

describe('PageMapcrComponent', () => {
  let component: PageMapcrComponent;
  let fixture: ComponentFixture<PageMapcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMapcrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMapcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
