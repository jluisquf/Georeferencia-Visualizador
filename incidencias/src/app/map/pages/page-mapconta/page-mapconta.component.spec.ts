import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMapcontaComponent } from './page-mapconta.component';

describe('PageMapcontaComponent', () => {
  let component: PageMapcontaComponent;
  let fixture: ComponentFixture<PageMapcontaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMapcontaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMapcontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
