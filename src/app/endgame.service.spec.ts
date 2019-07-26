import { TestBed } from '@angular/core/testing';

import { EndgameService } from './endgame.service';

describe('EndgameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndgameService = TestBed.get(EndgameService);
    expect(service).toBeTruthy();
  });
});
