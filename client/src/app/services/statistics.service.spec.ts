import { TestBed } from '@angular/core/testing';

import { StatisticsService } from './statistics.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StatisticsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getStatistics should place a GET request with the correct url', () => {
    service.getStatistics().subscribe();
    const req = httpMock.expectOne(`${environment.api}/tasks/statistics`);
    expect(req.request.method).toBe('GET');
  });
});
