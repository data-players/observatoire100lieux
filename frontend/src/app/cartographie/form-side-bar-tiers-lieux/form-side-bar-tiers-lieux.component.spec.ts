import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSideBarTiersLieuxComponent } from './form-side-bar-tiers-lieux.component';

describe('FormSidBarTiersLieuxComponent', () => {
  let component: FormSideBarTiersLieuxComponent;
  let fixture: ComponentFixture<FormSideBarTiersLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSideBarTiersLieuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSideBarTiersLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
