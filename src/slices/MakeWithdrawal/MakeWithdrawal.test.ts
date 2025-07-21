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
                account: "738f69e1-acaa-41a5-9ba7-b33093e48607",
                amount: 60
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'DepositMade',
            data: {
                account: "1cde3c4b-2231-4a7a-8eed-c274c1c5486b",
                amount: 50
            },

        },
            {
                type: 'AccountCreated',
                data: {
                    account: "1411056e-392e-40d3-bf57-3d2a9f7e916c",
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
