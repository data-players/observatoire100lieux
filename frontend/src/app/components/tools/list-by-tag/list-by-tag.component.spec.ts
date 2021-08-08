import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByTagComponent } from './list-by-tag.component';

describe('ListByTagComponent', () => {
  let component: ListByTagComponent;
  let fixture: ComponentFixture<ListByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListByTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
