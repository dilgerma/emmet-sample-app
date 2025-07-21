import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {TransferReceived} from '../../events/TransferReceived';
import {WithdrawalMade} from '../../events/WithdrawalMade';
import {TransferClosed} from '../../events/TransferClosed';
import {DepositMade} from '../../events/DepositMade';
import {MoneyTransferRequested} from '../../events/MoneyTransferRequested';
import {AccountCreated} from '../../events/AccountCreated';

export type AccountBalanceReadModelItem = {
    balance?: string,
    outstanding?: string,
    account?: string,
};

export type AccountBalanceReadModel = {
    data: AccountBalanceReadModelItem
}


const evolve = (
    document: AccountBalanceReadModel | null,
    {
        type,
        data: event
    }: TransferReceived | WithdrawalMade | TransferClosed | DepositMade | MoneyTransferRequested | AccountCreated
): AccountBalanceReadModel | null => {
    const state: AccountBalanceReadModel = {...document, data: {...{...document?.data}}};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Stick to the specification, don´t add new fields, which are not specified.
        Remove the TODO Comment afterwards.

        AI-TODO end
        */
        case "TransferReceived":
            return {
                ...document,
                data: {
                    account: event.account,
                    balance: event.amount,
                    outstanding: event.amount
                }
            }
        case "WithdrawalMade":
            return {
                ...document,
                data: {
                    account: event.account,
                    balance: event.amount,
                    outstanding: event.amount
                }
            }
        case "TransferClosed":
            return {
                ...document,
                data: {
                    account: event.account
                }
            }
        case "DepositMade":
            return {
                ...document,
                data: {
                    account: event.account,
                    balance: event.amount,
                    outstanding: event.amount
                }
            }
        case "MoneyTransferRequested":
            return {
                ...document,
                data: {
                    account: event.account,
                    balance: event.amount,
                    outstanding: event.amount
                }
            }
        case "AccountCreated":
            return {
                ...document,
                data: {
                    account: event.account
                }
            }
        default:
            return {...state};
    }
};

const collectionName = 'AccountBalance-collection';

export const AccountBalanceProjection = pongoSingleStreamProjection({
    canHandle: ["TransferReceived", "WithdrawalMade", "TransferClosed", "DepositMade", "MoneyTransferRequested", "AccountCreated"],
    collectionName,
    evolve,
});