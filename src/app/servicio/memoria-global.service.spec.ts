import { TestBed } from '@angular/core/testing';

import { MemoriaGlobalService } from './memoria-global.service';

describe('MemoriaGlobalService', () => {
  let service: MemoriaGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoriaGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
