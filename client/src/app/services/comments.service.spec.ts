import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService],
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getComments should place a GET request with the correct url', () => {
    service.getComments(1, {}).subscribe();
    const req = httpMock.expectOne(`${environment.api}/comments/1`);
    expect(req.request.method).toBe('GET');
  });

  it('postComment should place a POST request with the correct url and body', () => {
    service.postComment({ comment: 'mock comment', taskId: 1 }).subscribe();
    const req = httpMock.expectOne(`${environment.api}/comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ comment: 'mock comment', taskId: 1 });
  });
});
