import { TestBed } from '@angular/core/testing';

import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
