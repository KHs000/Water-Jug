import { Request, Response } from "express";
import { Controller } from "./controller";
import { DieHardResponse } from "./controller.models";

const sendMock = jest.fn();
const statusMock = jest.fn();
const res = {
    send: sendMock.mockReturnThis(),
    status: statusMock.mockReturnThis(),
} as unknown as Response;

describe("Controller tests", () => {
    const controller = new Controller();

    describe("ping route", () => {
        test("should return 200 OK under normal circumstances", async () => {
            const req = {} as Request;
            const expected = { response: "OK" };

            await controller.ping(req, res);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(sendMock).toHaveBeenCalledWith(expected);
        });
    });

    describe("solve route", () => {
        test("should return 200 and a JSON with the solution for the 'Die Hard' water juggle riddle", async () => {
            const body = { x_capacity: 5, y_capacity: 3, z_amount_wanted: 4 };
            const req = { body } as Request;
            const expected = DieHardResponse;

            await controller.solve(req, res);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(sendMock).toHaveBeenCalledWith(expected);
        });

        test("should return 200 and a JSON stating that there're no possible solutions for an unsolvable case of inputs", async () => {
            const body = { x_capacity: 2, y_capacity: 6, z_amount_wanted: 5 };
            const req = { body } as Request;
            const expected = { solution: 'No Solution.' };

            await controller.solve(req, res);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(sendMock).toHaveBeenCalledWith(expected);
        });

        test("should return 400 and an error message in case 'x_capacity' is invalid (not a positive integer)", async () => {
            const body = { x_capacity: 'invalid', y_capacity: 3, z_amount_wanted: 4 };
            const req = { body } as Request;
            const expected = { message: 'all parameters must be positive integers' };

            await controller.solve(req, res);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(sendMock).toHaveBeenCalledWith(expected);
        });

        test("should return 400 and an error message in case 'y_capacity' is invalid (not a positive integer)", async () => {
            const body = { x_capacity: 5, y_capacity: 0, z_amount_wanted: 4 };
            const req = { body } as Request;
            const expected = { message: 'all parameters must be positive integers' };

            await controller.solve(req, res);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(sendMock).toHaveBeenCalledWith(expected);
        });

        test("should return 400 and an error message in case 'z_amount_wanted' is invalid (not a positive integer)", async () => {
            const body = { x_capacity: 5, y_capacity: 3, z_amount_wanted: -1 };
            const req = { body } as Request;
            const expected = { message: 'all parameters must be positive integers' };

            await controller.solve(req, res);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(sendMock).toHaveBeenCalledWith(expected);
        });
    });
});