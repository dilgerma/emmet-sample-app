import {Request, Response, Router} from 'express';
import {handleMakeWithdrawal, MakeWithdrawalCommand} from './MakeWithdrawalCommand';
import {requireUser} from "../../supabase/requireUser";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmpty} from "../../components/util/assertions";


type MakeWithdrawalRequest = Request<
    Partial<{ id: string }>,
    unknown,
    Partial<{
        account: string,
        amount: any
    }>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/makewithdrawal/:id', async (req: MakeWithdrawalRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command: MakeWithdrawalCommand = {
                        data: {
                            account: assertNotEmpty(req.body.account),
                            amount: assertNotEmpty(req.body.amount)
                            //amount: req.body.amount,
                        },
                        type: "MakeWithdrawal"
                    }
                    await handleMakeWithdrawal(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ok: true});
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ok: false, error: 'Server error'});
                }
            });
        };

