import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {Account2Events} from "../../events/Account2Events";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type CloseTransferCommand = Command<'CloseTransfer', {
    account: string,
    transactionId: string,
}>;

// TODO-AI keep attributes in state optional
export type CloseTransferState = {}

export const CloseTransferInitialState = (): CloseTransferState => ({});

export const evolve = (
    state: CloseTransferState,
    event: Account2Events,
): CloseTransferState => {
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
    command: CloseTransferCommand,
    state: CloseTransferState,
): Account2Events[] => {
    return [{
        type: "TransferClosed",
        data: {
            account: command.data.account,
            transactionId: command.data.transactionId
        }
    }]
};


const CloseTransferCommandHandler = CommandHandler<CloseTransferState, Account2Events>({
    evolve,
    initialState: CloseTransferInitialState
});

export const handleCloseTransfer = async (id: string, command: CloseTransferCommand) => {
    const eventStore = await findEventstore()
    await CloseTransferCommandHandler(eventStore, id, (state: CloseTransferState) => decide(command, state))

}

