import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMapainComponent } from './page-mapain.component';

describe('PageMapainComponent', () => {
  let component: PageMapainComponent;
  let fixture: ComponentFixture<PageMapainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMapainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMapainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
