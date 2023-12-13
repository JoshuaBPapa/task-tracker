import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class UnsubscribeService {
  private subscriptions: Subscription[] = [];

  addSubscription(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
