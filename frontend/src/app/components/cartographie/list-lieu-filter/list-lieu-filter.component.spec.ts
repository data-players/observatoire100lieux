import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLieuFilterComponent } from './list-lieu-filter.component';

describe('ListLieuFilterComponent', () => {
  let component: ListLieuFilterComponent;
  let fixture: ComponentFixture<ListLieuFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLieuFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLieuFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
