import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographieComponent } from './cartoraphie.component';

describe('CartoraphieComponent', () => {
  let component: CartographieComponent;
  let fixture: ComponentFixture<CartographieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartographieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartographieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
