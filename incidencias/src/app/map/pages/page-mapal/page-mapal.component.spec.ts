import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMapalComponent } from './page-mapal.component';

describe('PageMapalComponent', () => {
  let component: PageMapalComponent;
  let fixture: ComponentFixture<PageMapalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMapalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMapalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
