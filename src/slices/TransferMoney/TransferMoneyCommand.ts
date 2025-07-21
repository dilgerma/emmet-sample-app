import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {Account2Events} from "../../events/Account2Events";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type TransferMoneyCommand = Command<'TransferMoney', {
    amount: string,
    targetAccount: string,
    account: string,
    transactionId: string,
}>;

// TODO-AI keep attributes in state optional
export type TransferMoneyState = {}

export const TransferMoneyInitialState = (): TransferMoneyState => ({});

export const evolve = (
    state: TransferMoneyState,
    event: Account2Events,
): TransferMoneyState => {
    const {type, data} = event;

    switch (type) {
        // case "..Event":
        default:
            return state;
    }
};

/*
AI-TODO start: implement according to the specifications provided.
Stick to the specification, don´t add new fields, which are not specified.

in case an error is expected - throw an error

Remove the TODO Comment afterwards.


# Spec Start
Title: spec: Transfer Money insufficient funds
Comments:
  - can only use saldo available
### Given (Events):
  * 'Account created' (SPEC_EVENT)
Fields:
 - account: accountA
 - initialBalance: 100
### When (Command):
  * 'Transfer Money' (SPEC_COMMAND)
Fields:
 - amount: 101
 - targetAccount: accountB
 - account: accountA
 - transactionId: 1234
### Then:
  * 'Error-Case' (SPEC_ERROR)
# Spec End

# Spec Start
Title: spec: Transfer Money
### Given (Events): None
### When (Command): None
### Then: None
# Spec End
AI-TODO end
*/
export const decide = (
    command: TransferMoneyCommand,
    state: TransferMoneyState,
): Account2Events[] => {
    return [{
        type: "MoneyTransferRequested",
        data: {
            amount: command.data.amount,
            targetAccount: command.data.targetAccount,
            account: command.data.account,
            transactionId: command.data.transactionId
        }
    }]
};


const TransferMoneyCommandHandler = CommandHandler<TransferMoneyState, Account2Events>({
    evolve,
    initialState: TransferMoneyInitialState
});

export const handleTransferMoney = async (id: string, command: TransferMoneyCommand) => {
    const eventStore = await findEventstore()
    await TransferMoneyCommandHandler(eventStore, id, (state: TransferMoneyState) => decide(command, state))

}

