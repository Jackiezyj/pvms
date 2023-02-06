import { TestBed } from '@angular/core/testing';

import { ScrStyleService } from './scr-style.service';

describe('ScrStyleService', () => {
  let service: ScrStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
