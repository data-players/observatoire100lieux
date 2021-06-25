import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTiersLieuxComponent } from './map-tiers-lieux.component';

describe('MapTiersLieuxComponent', () => {
  let component: MapTiersLieuxComponent;
  let fixture: ComponentFixture<MapTiersLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapTiersLieuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTiersLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
