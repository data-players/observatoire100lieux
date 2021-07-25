import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSideBarListToolsComponent } from './form-side-bar-list-tools.component';

describe('FormSideBarListToolsComponent', () => {
  let component: FormSideBarListToolsComponent;
  let fixture: ComponentFixture<FormSideBarListToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSideBarListToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSideBarListToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
