import { TestBed } from '@angular/core/testing';

import { UnsubscribeService } from './unsubscribe.service';
import { Subscription } from 'rxjs';

describe('UnsubscribeService', () => {
  let service: UnsubscribeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsubscribeService],
    });
    service = TestBed.inject(UnsubscribeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addSubscription should add a subscription to the subscriptions array', () => {
    const mockSub = new Subscription();
    // @ts-expect-error
    expect(service.subscriptions.length).toBe(0);
    service.addSubscription(mockSub);
    // @ts-expect-error
    expect(service.subscriptions.length).toBe(1);
  });

  it('unsubscribeAll should unsubscribe from all subcsriptions in the subscriptions array', () => {
    const mockSub = new Subscription();
    const mockSub2 = new Subscription();
    // @ts-expect-error
    service.subscriptions.push(mockSub, mockSub2);
    // @ts-expect-error
    service.subscriptions.forEach((sub) => {
      expect(sub.closed).toBe(false);
    });

    service.unsubscribeAll();
    // @ts-expect-error
    service.subscriptions.forEach((sub) => {
      expect(sub.closed).toBe(true);
    });
  });
});
