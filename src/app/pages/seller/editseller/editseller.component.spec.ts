import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsellerComponent } from './editseller.component';

describe('EditsellerComponent', () => {
  let component: EditsellerComponent;
  let fixture: ComponentFixture<EditsellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
