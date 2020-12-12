import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditextrasComponent } from './editextras.component';

describe('EditextrasComponent', () => {
  let component: EditextrasComponent;
  let fixture: ComponentFixture<EditextrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditextrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditextrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
