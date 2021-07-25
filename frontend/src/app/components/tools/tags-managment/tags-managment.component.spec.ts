import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsManagmentComponent } from './tags-managment.component';

describe('TagsManagmentComponent', () => {
  let component: TagsManagmentComponent;
  let fixture: ComponentFixture<TagsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
