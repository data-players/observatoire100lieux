import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToolsFilterComponent } from './list-tools-filter.component';

describe('ListToolsFilterComponent', () => {
  let component: ListToolsFilterComponent;
  let fixture: ComponentFixture<ListToolsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListToolsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListToolsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
