import type { Command } from '@event-driven-io/emmett'
import { CommandHandler } from '@event-driven-io/emmett';
import {Account2Events} from "../../events/Account2Events";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type MakeWithdrawalCommand = Command<'MakeWithdrawal', {
          account: string,
  amount: any,
        }>;

// TODO-AI keep attributes in state optional
export type MakeWithdrawalState = {
}

export const MakeWithdrawalInitialState = (): MakeWithdrawalState => ({
});

export const evolve = (
    state: MakeWithdrawalState,
    event: Account2Events,
): MakeWithdrawalState => {
    const { type, data } = event;

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
Title: spec: Make Withdrawal not enough funds
Comments:
  - cannot withdraw if not enough funds
### Given (Events):
  * 'Account created' (SPEC_EVENT)
Fields:
 - account: 1234
 - initialBalance: 50
### When (Command):
  * 'Make Withdrawal' (SPEC_COMMAND)
Fields:
 - account: 1234
 - amount: 60
### Then:
  * 'Error-Case' (SPEC_ERROR)
# Spec End

# Spec Start
Title: spec: Make Withdrawal
### Given (Events):
  * 'Deposit made' (SPEC_EVENT)
Fields:
 - account: 
 - amount: 50
  * 'Account created' (SPEC_EVENT)
Fields:
 - account: 
 - initialBalance: 100
### When (Command):
  * 'Make Withdrawal' (SPEC_COMMAND)
Fields:
 - account: 
 - amount: 60
### Then:
  * 'Withdrawal made' (SPEC_EVENT)
Fields:
 - account: 
 - amount: 60
# Spec End
AI-TODO end
*/
    export const decide = (
    command: MakeWithdrawalCommand,
    state: MakeWithdrawalState,
): Account2Events[] => {
    return [{
        type: "WithdrawalMade",
            data: {
        			account:command.data.account,
			amount:command.data.amount
    }}]
};


const MakeWithdrawalCommandHandler = CommandHandler<MakeWithdrawalState, Account2Events>({evolve,initialState:MakeWithdrawalInitialState});

export const handleMakeWithdrawal = async (id:string,command:MakeWithdrawalCommand) => {
    const eventStore = await findEventstore()
    await MakeWithdrawalCommandHandler(eventStore, id, (state:MakeWithdrawalState)=>decide(command,state))

}

