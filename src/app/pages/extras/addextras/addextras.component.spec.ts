import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddextrasComponent } from './addextras.component';

describe('AddextrasComponent', () => {
  let component: AddextrasComponent;
  let fixture: ComponentFixture<AddextrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddextrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddextrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
