import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMaptdComponent } from './page-maptd.component';

describe('PageMaptdComponent', () => {
  let component: PageMaptdComponent;
  let fixture: ComponentFixture<PageMaptdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMaptdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMaptdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
