import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainwrapperComponent } from './mainwrapper.component';

describe('MainwrapperComponent', () => {
  let component: MainwrapperComponent;
  let fixture: ComponentFixture<MainwrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainwrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
