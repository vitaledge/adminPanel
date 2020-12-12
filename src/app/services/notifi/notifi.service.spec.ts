import { TestBed } from '@angular/core/testing';

import { NotifiService } from './notifi.service';

describe('NotifiService', () => {
  let service: NotifiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
