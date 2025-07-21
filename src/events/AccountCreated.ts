import type { Event } from '@event-driven-io/emmett'

export type AccountCreated = Event<'AccountCreated', {
          account: string,
  initialBalance: string,
        }>;