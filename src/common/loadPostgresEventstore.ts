import {getPostgreSQLEventStore} from "@event-driven-io/emmett-postgresql";
import {projections} from "@event-driven-io/emmett";
import {postgresUrl} from "./db";
import {CustomersToBeNotifiedProjection} from "../slices/CustomersToBeNotified/CustomersToBeNotifiedProjection"
import {AccountBalanceProjection} from "../slices/AccountBalance/AccountBalanceProjection"
import {OpenTransfersProjection} from "../slices/OpenTransfers/OpenTransfersProjection"

    export const findEventstore = async () => {


    return getPostgreSQLEventStore(postgresUrl, {
        projections: projections.inline([
            CustomersToBeNotifiedProjection,
AccountBalanceProjection,
OpenTransfersProjection
        ]),
});

}