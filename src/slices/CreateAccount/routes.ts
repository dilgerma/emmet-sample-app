import { Router, Request, Response } from 'express';
import { CreateAccountCommand, handleCreateAccount } from './CreateAccountCommand';
import {requireUser} from "../../supabase/requireUser";
import {on, WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmptyString} from "@event-driven-io/emmett";
import {assertNotEmpty} from "../../components/util/assertions";


type CreateAccountRequest = Request<
    Partial<{ id:string }>,
    unknown,
    Partial<{ initialBalance:string,
account:string }>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/createaccount/:id', async (req: CreateAccountRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command:CreateAccountCommand = {
                        data: {
                            			initialBalance:assertNotEmpty(req.body.initialBalance),
			account:assertNotEmpty(req.body.account)
                            //amount: req.body.amount,
                        },
                        type: "CreateAccount"
                    }
                    await handleCreateAccount(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ ok: true });
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ ok: false, error: 'Server error' });
                }
            });
        };

