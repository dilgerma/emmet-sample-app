import type {Event} from '@event-driven-io/emmett'

export type TransferCancelled = Event<'TransferCancelled', {
    account: string,
    transactionId: string,
}>;