import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLieuComponent } from './list-lieu.component';

describe('ListLieuComponent', () => {
  let component: ListLieuComponent;
  let fixture: ComponentFixture<ListLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLieuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
