import type { Event } from '@event-driven-io/emmett'

export type WithdrawalMade = Event<'WithdrawalMade', {
          account: string,
  amount: any,
        }>;