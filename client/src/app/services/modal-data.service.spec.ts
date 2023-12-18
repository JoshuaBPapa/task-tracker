import { TestBed } from '@angular/core/testing';

import { ModalDataService } from './modal-data.service';
import { MessageService } from 'primeng/api';

describe('ModalDataService', () => {
  let service: ModalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalDataService, MessageService],
    });
    service = TestBed.inject(ModalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
