import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMaptComponent } from './page-mapt.component';

describe('PageMaptComponent', () => {
  let component: PageMaptComponent;
  let fixture: ComponentFixture<PageMaptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMaptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMaptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
