import {Request, Response, Router} from 'express';
import {handleTransferMoney, TransferMoneyCommand} from './TransferMoneyCommand';
import {requireUser} from "../../supabase/requireUser";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmpty} from "../../components/util/assertions";


type TransferMoneyRequest = Request<
    Partial<{ id: string }>,
    unknown,
    Partial<{
        amount: string,
        targetAccount: string,
        account: string,
        transactionId: string
    }>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/transfermoney/:id', async (req: TransferMoneyRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command: TransferMoneyCommand = {
                        data: {
                            amount: assertNotEmpty(req.body.amount),
                            targetAccount: assertNotEmpty(req.body.targetAccount),
                            account: assertNotEmpty(req.body.account),
                            transactionId: assertNotEmpty(req.body.transactionId)
                            //amount: req.body.amount,
                        },
                        type: "TransferMoney"
                    }
                    await handleTransferMoney(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ok: true});
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ok: false, error: 'Server error'});
                }
            });
        };

