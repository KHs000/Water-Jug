import express from 'express';
import request from 'supertest';

const pingMock = jest.fn();
const solveMock = jest.fn();

jest.mock("../controller/controller", () => ({
    Controller: jest.fn().mockImplementation(() => ({
        ping: pingMock,
        solve: solveMock,
    })),
}));

import router from './router';

const app = express();

app.use("/", router);

describe("router tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should have a GET route to '/ping'", async () => {
        pingMock.mockImplementationOnce((req, res) => {
            return res.send("success");
        });

        await request(app).get("/ping");

        expect(pingMock).toHaveBeenCalled();
    });

    test("should have a POST route to '/solve'", async () => {
        solveMock.mockImplementationOnce((req, res) => {
            return res.send("success");
        });

        await request(app).post("/solve");

        expect(solveMock).toHaveBeenCalled();
    });
});
