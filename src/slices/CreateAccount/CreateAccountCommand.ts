import type { Command } from '@event-driven-io/emmett'
import { CommandHandler } from '@event-driven-io/emmett';
import {Account2Events} from "../../events/Account2Events";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type CreateAccountCommand = Command<'CreateAccount', {
          initialBalance: string,
  account: string,
        }>;

// TODO-AI keep attributes in state optional
export type CreateAccountState = {
}

export const CreateAccountInitialState = (): CreateAccountState => ({
});

export const evolve = (
    state: CreateAccountState,
    event: Account2Events,
): CreateAccountState => {
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


AI-TODO end
*/
    export const decide = (
    command: CreateAccountCommand,
    state: CreateAccountState,
): Account2Events[] => {
    return [{
        type: "AccountCreated",
            data: {
        			account:command.data.account,
			initialBalance:command.data.initialBalance
    }}]
};


const CreateAccountCommandHandler = CommandHandler<CreateAccountState, Account2Events>({evolve,initialState:CreateAccountInitialState});

export const handleCreateAccount = async (id:string,command:CreateAccountCommand) => {
    const eventStore = await findEventstore()
    await CreateAccountCommandHandler(eventStore, id, (state:CreateAccountState)=>decide(command,state))

}

