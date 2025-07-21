import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {Account2Events} from "../../events/Account2Events";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type MakeDepositCommand = Command<'MakeDeposit', {
    account: string,
    amount: any,
}>;

// TODO-AI keep attributes in state optional
export type MakeDepositState = {}

export const MakeDepositInitialState = (): MakeDepositState => ({});

export const evolve = (
    state: MakeDepositState,
    event: Account2Events,
): MakeDepositState => {
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


AI-TODO end
*/
export const decide = (
    command: MakeDepositCommand,
    state: MakeDepositState,
): Account2Events[] => {
    return [{
        type: "DepositMade",
        data: {
            account: command.data.account,
            amount: command.data.amount
        }
    }]
};


const MakeDepositCommandHandler = CommandHandler<MakeDepositState, Account2Events>({
    evolve,
    initialState: MakeDepositInitialState
});

export const handleMakeDeposit = async (id: string, command: MakeDepositCommand) => {
    const eventStore = await findEventstore()
    await MakeDepositCommandHandler(eventStore, id, (state: MakeDepositState) => decide(command, state))

}

