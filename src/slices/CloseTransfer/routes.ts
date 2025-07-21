import { Router, Request, Response } from 'express';
import { CloseTransferCommand, handleCloseTransfer } from './CloseTransferCommand';
import {requireUser} from "../../supabase/requireUser";
import {on, WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmptyString} from "@event-driven-io/emmett";
import {assertNotEmpty} from "../../components/util/assertions";


type CloseTransferRequest = Request<
    Partial<{ id:string }>,
    unknown,
    Partial<{ account:string,
transactionId:string }>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/closetransfer/:id', async (req: CloseTransferRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command:CloseTransferCommand = {
                        data: {
                            			account:assertNotEmpty(req.body.account),
			transactionId:assertNotEmpty(req.body.transactionId)
                            //amount: req.body.amount,
                        },
                        type: "CloseTransfer"
                    }
                    await handleCloseTransfer(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ ok: true });
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ ok: false, error: 'Server error' });
                }
            });
        };

