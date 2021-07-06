import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPlacesComponent } from './pending-places.component';

describe('PendingPlacesComponent', () => {
  let component: PendingPlacesComponent;
  let fixture: ComponentFixture<PendingPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
