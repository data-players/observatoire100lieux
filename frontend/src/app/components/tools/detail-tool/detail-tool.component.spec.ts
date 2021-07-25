import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailToolComponent } from './detail-tool.component';

describe('DetailToolComponent', () => {
  let component: DetailToolComponent;
  let fixture: ComponentFixture<DetailToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
