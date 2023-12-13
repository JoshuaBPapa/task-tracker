import { TestBed } from '@angular/core/testing';

import { ParamsService } from './params.service';

describe('ParamsService', () => {
  let service: ParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParamsService],
    });
    service = TestBed.inject(ParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getParamsValue should return the value of params', () => {
    // @ts-expect-error
    service.params.next({ page: 1 });
    expect(service.getParamsValue()).toEqual({ page: 1 });
  });

  it('setNewParamsValue should save the new params and reset pagination if resetPagination equals true', () => {
    // @ts-expect-error
    expect(service.params.value).toEqual({});

    service.setNewParamsValue({ search: 'mock' }, false);
    // @ts-expect-error
    expect(service.params.value).toEqual({ search: 'mock' });

    service.setNewParamsValue({ search: 'mock2' }, true);
    // @ts-expect-error
    expect(service.params.value).toEqual({ search: 'mock2', page: 1 });

    service.setNewParamsValue({ search: 'mock3', page: 2 });
    // @ts-expect-error
    expect(service.params.value).toEqual({ search: 'mock3', page: 2 });

    service.setNewParamsValue({ search: 'mock4' }, true);
    // @ts-expect-error
    expect(service.params.value).toEqual({ search: 'mock4', page: 1 });
  });
});
