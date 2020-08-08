import {Request, Response, Router} from "express";
import MessageSchema from '../schemas/MessageSchema';

const exampleRouter = Router();

exampleRouter.get('/example', (req: Request, res: Response) => {
    const message = new MessageSchema({
        level: 'info',
        time: Math.floor(new Date().getTime()/1000),
        message: 'lorem ipsum',
    });

    message.save().then(result => {
        res.send(result);
    })
});

export default exampleRouter;
