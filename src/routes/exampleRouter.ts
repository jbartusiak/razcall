import {Request, Response, Router} from "express";

const exampleRouter = Router();

exampleRouter.get('/example', (req: Request, res: Response) => {
    res.send('Hello from router!');
});

export default exampleRouter;
