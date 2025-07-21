import type { Command } from '@event-driven-io/emmett'
import { CommandHandler } from '@event-driven-io/emmett';
import {Account2Events} from "../../events/Account2Events";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type AddBookCommand = Command<'AddBook', {
          name: string,
  email: string,
        }>;

// TODO-AI keep attributes in state optional
export type AddBookState = {
}

export const AddBookInitialState = (): AddBookState => ({
});

export const evolve = (
    state: AddBookState,
    event: Account2Events,
): AddBookState => {
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
    command: AddBookCommand,
    state: AddBookState,
): Account2Events[] => {
    return [{
        type: "BookAdded",
            data: {
        			name:command.data.name,
			email:command.data.email
    }}]
};


const AddBookCommandHandler = CommandHandler<AddBookState, Account2Events>({evolve,initialState:AddBookInitialState});

export const handleAddBook = async (id:string,command:AddBookCommand) => {
    const eventStore = await findEventstore()
    await AddBookCommandHandler(eventStore, id, (state:AddBookState)=>decide(command,state))

}

