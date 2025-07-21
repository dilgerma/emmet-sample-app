import type {Event} from '@event-driven-io/emmett'

export type DepositMade = Event<'DepositMade', {
    account: string,
    amount: any,
}>;