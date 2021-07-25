import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostersComponent } from './form-posters.component';

describe('FormPostersComponent', () => {
  let component: FormPostersComponent;
  let fixture: ComponentFixture<FormPostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPostersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
