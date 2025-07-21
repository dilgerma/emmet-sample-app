import type { Command } from '@event-driven-io/emmett'
import { CommandHandler } from '@event-driven-io/emmett';
import {Account2Events} from "../../events/Account2Events";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type ProcessTransferCommand = Command<'ProcessTransfer', {
          amount: any,
  account: string,
  sourceAccount: string,
  transactionId: string,
        }>;

// TODO-AI keep attributes in state optional
export type ProcessTransferState = {
}

export const ProcessTransferInitialState = (): ProcessTransferState => ({
});

export const evolve = (
    state: ProcessTransferState,
    event: Account2Events,
): ProcessTransferState => {
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
    command: ProcessTransferCommand,
    state: ProcessTransferState,
): Account2Events[] => {
    return [{
        type: "TransferCancelled",
            data: {
        			account:command.data.account,
			transactionId:command.data.transactionId
    }},{
        type: "TransferReceived",
            data: {
        			account:command.data.account,
			amount:command.data.amount,
			sourceAccount:command.data.sourceAccount,
			transactionId:command.data.transactionId
    }}]
};


const ProcessTransferCommandHandler = CommandHandler<ProcessTransferState, Account2Events>({evolve,initialState:ProcessTransferInitialState});

export const handleProcessTransfer = async (id:string,command:ProcessTransferCommand) => {
    const eventStore = await findEventstore()
    await ProcessTransferCommandHandler(eventStore, id, (state:ProcessTransferState)=>decide(command,state))

}

