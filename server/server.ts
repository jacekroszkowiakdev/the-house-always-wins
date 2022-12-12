import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3030;
import { json } from "body-parser";
import cors from "cors";
app.use(json());

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// session options:
import session from "express-session";
declare module "express-session" {
    export interface SessionData {
        userId: { [key: string]: any };
        credits: number;
    }
}
// let session: SessionData;

app.use(
    session({
        secret: "pssssst",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
    })
);

// routes
import getThreeFruits from "./game-logic";

app.get("/welcome", (req: Request, res: Response) => {
    res.send(getThreeFruits());
});

app.get("/session", (req: Request, res: Response) => {
    const id = req.session.userId;
    let ssn = req.session;
    ssn.credits = 10;
    res.send({ ssn });
});

app.get("/session/game", (req: Request, res: Response) => {
    res.send(getThreeFruits());
});

app.listen(port, () => console.log(`listening on port ${port}`));
