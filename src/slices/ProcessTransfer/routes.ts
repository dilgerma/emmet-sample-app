import { Router, Request, Response } from 'express';
import { ProcessTransferCommand, handleProcessTransfer } from './ProcessTransferCommand';
import {requireUser} from "../../supabase/requireUser";
import {on, WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmptyString} from "@event-driven-io/emmett";
import {assertNotEmpty} from "../../components/util/assertions";


type ProcessTransferRequest = Request<
    Partial<{ id:string }>,
    unknown,
    Partial<{ amount:any,
account:string,
sourceAccount:string,
transactionId:string }>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/processtransfer/:id', async (req: ProcessTransferRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command:ProcessTransferCommand = {
                        data: {
                            			amount:assertNotEmpty(req.body.amount),
			account:assertNotEmpty(req.body.account),
			sourceAccount:assertNotEmpty(req.body.sourceAccount),
			transactionId:assertNotEmpty(req.body.transactionId)
                            //amount: req.body.amount,
                        },
                        type: "ProcessTransfer"
                    }
                    await handleProcessTransfer(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ ok: true });
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ ok: false, error: 'Server error' });
                }
            });
        };

