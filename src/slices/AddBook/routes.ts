import { Router, Request, Response } from 'express';
import { AddBookCommand, handleAddBook } from './AddBookCommand';
import {requireUser} from "../../supabase/requireUser";
import {on, WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmptyString} from "@event-driven-io/emmett";
import {assertNotEmpty} from "../../components/util/assertions";


type AddBookRequest = Request<
    Partial<{ id:string }>,
    unknown,
    Partial<{ name:string,
email:string }>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/addbook/:id', async (req: AddBookRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command:AddBookCommand = {
                        data: {
                            			name:assertNotEmpty(req.body.name),
			email:assertNotEmpty(req.body.email)
                            //amount: req.body.amount,
                        },
                        type: "AddBook"
                    }
                    await handleAddBook(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ ok: true });
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ ok: false, error: 'Server error' });
                }
            });
        };

