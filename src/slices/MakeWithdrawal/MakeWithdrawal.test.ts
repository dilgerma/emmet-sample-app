import {DeciderSpecification} from '@event-driven-io/emmett';
import {decide, evolve, MakeWithdrawalCommand} from "./MakeWithdrawalCommand";
import {describe, it} from "node:test";


describe('MakeWithdrawal Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec: Make Withdrawal not enough funds', () => {

        const command: MakeWithdrawalCommand = {
            type: 'MakeWithdrawal',
            data: {
                account: "1234",
                amount: 60
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'AccountCreated',
            data: {
                account: "1234",
                initialBalance: "50"
            },

        }])
            .when(command)
            .thenThrows()
    });
    it('spec: Make Withdrawal', () => {

        const command: MakeWithdrawalCommand = {
            type: 'MakeWithdrawal',
            data: {
                account: "d3064eb1-ed65-4e13-9e88-9bf0bdf7aecc",
                amount: 60
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'DepositMade',
            data: {
                account: "9ab4a23f-4acb-4c06-92d6-96d39f31d68c",
                amount: 50
            },

        },
            {
                type: 'AccountCreated',
                data: {
                    account: "6b01fdbf-5188-4dce-960e-15130ebca4a6",
                    initialBalance: "100"
                },

            }])
            .when(command)
            .then([{
                type: 'WithdrawalMade',
                data: {
                    account: command.data.account,
                    amount: command.data.amount
                },
            }])
    });

});
