import {DeciderSpecification} from '@event-driven-io/emmett';
import {TransferMoneyCommand, TransferMoneyState, decide, evolve} from "./TransferMoneyCommand";
import {describe, it} from "node:test";



describe('TransferMoney Specification', () => {

        const given = DeciderSpecification.for({
            decide,
            evolve,
            initialState: ()=>({})
        });

        it('spec: Transfer Money insufficient funds', () => {

            const command: TransferMoneyCommand = {
                type: 'TransferMoney',
                data: {
                    amount: "101",
targetAccount: "accountB",
account: "accountA",
transactionId: "1234"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'AccountCreated',
                        data: {
                            account: "accountA",
initialBalance: "100"
                        },
                        
                    }])
                .when(command)
                .thenThrows()
        });

    });
