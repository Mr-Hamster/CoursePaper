import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Well done asd asd qweqwe asd!');
});

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});