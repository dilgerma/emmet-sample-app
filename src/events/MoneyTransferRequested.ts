import type { Event } from '@event-driven-io/emmett'

export type MoneyTransferRequested = Event<'MoneyTransferRequested', {
          amount: string,
  targetAccount: string,
  account: string,
  transactionId: string,
        }>;