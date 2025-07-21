import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {BookAdded} from '../../events/BookAdded';

export type CustomersToBeNotifiedReadModelItem = {
    email?: string,
    name?: string,
    taskId?: string,
};

export type CustomersToBeNotifiedReadModel = {
    data: CustomersToBeNotifiedReadModelItem
}


const evolve = (
    document: CustomersToBeNotifiedReadModel | null,
    {type, data: event}: BookAdded
): CustomersToBeNotifiedReadModel | null => {
    const state: CustomersToBeNotifiedReadModel = {...document, data: {...{...document?.data}}};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Stick to the specification, don´t add new fields, which are not specified.
        Remove the TODO Comment afterwards.

        AI-TODO end
        */
        case "BookAdded":
            return {
                ...document,
                data: {
                    email: event.email,
                    name: event.name
                }
            }
        default:
            return {...state};
    }
};

const collectionName = 'CustomersToBeNotified-collection';

export const CustomersToBeNotifiedProjection = pongoSingleStreamProjection({
    canHandle: ["BookAdded"],
    collectionName,
    evolve,
});