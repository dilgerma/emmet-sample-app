import type {Event} from '@event-driven-io/emmett'

export type TransferClosed = Event<'TransferClosed', {
    account: string,
    transactionId: string,
}>;