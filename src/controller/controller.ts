import { Request, Response } from 'express';
import { Service } from '../service/service';

export class Controller {

    private isPositiveInteger = (n: number): boolean => {
        return n !== Infinity && n === Math.floor(n) && n > 0;
    }

    private validateParameters = (
        x: number,
        y: number,
        z: number
    ): { isValid: boolean, errMsg: string } => {
        let errMsg: string = "";

        if (!this.isPositiveInteger(x) || !this.isPositiveInteger(y) || !this.isPositiveInteger(z))
            errMsg = "all parameters must be positive integers";

        return { isValid: !errMsg, errMsg };
    }


    ping = async (req: Request, res: Response) => {
        return res.status(200).send({ response: "OK" });
    }

    solve = async (req: Request, res: Response) => {
        const { x_capacity, y_capacity, z_amount_wanted }: {
            x_capacity: number,
            y_capacity: number,
            z_amount_wanted: number
        } = req.body;

        const { isValid, errMsg } = this.validateParameters(x_capacity, y_capacity, z_amount_wanted);
        if (!isValid)
            return res.status(400).send({ message: errMsg });

        const service = new Service(x_capacity, y_capacity);
        const steps = service.SolveRiddle(z_amount_wanted);

        if (steps)
            return res.status(200).send({ solution: steps });

        return res.status(200).send({ solution: 'No Solution.' })
    }

}