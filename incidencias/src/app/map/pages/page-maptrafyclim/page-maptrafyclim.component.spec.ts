import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMaptrafyclimComponent } from './page-maptrafyclim.component';

describe('PageMaptrafyclimComponent', () => {
  let component: PageMaptrafyclimComponent;
  let fixture: ComponentFixture<PageMaptrafyclimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMaptrafyclimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMaptrafyclimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
