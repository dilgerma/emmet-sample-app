import type {Event} from '@event-driven-io/emmett'

export type TransferReceived = Event<'TransferReceived', {
    account: string,
    amount: string,
    sourceAccount: string,
    transactionId: string,
}>;