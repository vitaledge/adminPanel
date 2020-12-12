import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbuyerComponent } from './addbuyer.component';

describe('AddbuyerComponent', () => {
  let component: AddbuyerComponent;
  let fixture: ComponentFixture<AddbuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
