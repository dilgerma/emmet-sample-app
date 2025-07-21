import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {TransferReceived} from '../../events/TransferReceived';
import {TransferClosed} from '../../events/TransferClosed';
import {MoneyTransferRequested} from '../../events/MoneyTransferRequested';

export type OpenTransfersReadModelItem = {
    sourceAccount?: string,
    amount?: string,
    targetAccount?: string,
    transactionId?: string,
    processed?: boolean,
    closed?: boolean,
};

export type OpenTransfersReadModel = {
    data: OpenTransfersReadModelItem[]
}


const evolve = (
    document: OpenTransfersReadModel | null,
    {type, data: event}: TransferReceived | TransferClosed | MoneyTransferRequested
): OpenTransfersReadModel | null => {
    const state: OpenTransfersReadModel = {...document, data: [...document?.data ?? []]};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Stick to the specification, don´t add new fields, which are not specified.
        Remove the TODO Comment afterwards.

        AI-TODO end
        */
        case "TransferReceived": {
            const existing = state.data?.find(item => item.sourceAccount === event.account)

            if (existing) {
                Object.assign(existing, {
                    sourceAccount: event.sourceAccount,
                    amount: event.amount,
                    transactionId: event.transactionId
                })
            } else {
                state?.data?.push({
                    sourceAccount: event.sourceAccount,
                    amount: event.amount,
                    transactionId: event.transactionId
                })
            }
            return {...state};
        }
        case "TransferClosed": {
            const existing = state.data?.find(item => item.sourceAccount === event.account)

            if (existing) {
                Object.assign(existing, {
                    sourceAccount: event.account,
                    transactionId: event.transactionId
                })
            } else {
                state?.data?.push({
                    sourceAccount: event.account,
                    transactionId: event.transactionId
                })
            }
            return {...state};
        }
        case "MoneyTransferRequested": {
            const existing = state.data?.find(item => item.sourceAccount === event.account)

            if (existing) {
                Object.assign(existing, {
                    sourceAccount: event.account,
                    amount: event.amount,
                    targetAccount: event.targetAccount,
                    transactionId: event.transactionId
                })
            } else {
                state?.data?.push({
                    sourceAccount: event.account,
                    amount: event.amount,
                    targetAccount: event.targetAccount,
                    transactionId: event.transactionId
                })
            }
            return {...state};
        }
        default:
            return {...state};
    }
};

const collectionName = 'OpenTransfers-collection';

export const OpenTransfersProjection = pongoSingleStreamProjection({
    canHandle: ["TransferReceived", "TransferClosed", "MoneyTransferRequested"],
    collectionName,
    evolve,
});