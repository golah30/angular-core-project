import { TestBed } from '@angular/core/testing';

import { ModalMessageService } from './modal-message.service';

describe('ModalMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalMessageService = TestBed.get(ModalMessageService);
    expect(service).toBeTruthy();
  });
});
