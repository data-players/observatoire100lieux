import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToolComponent } from './form-tool.component';

describe('FormToolComponent', () => {
  let component: FormToolComponent;
  let fixture: ComponentFixture<FormToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
