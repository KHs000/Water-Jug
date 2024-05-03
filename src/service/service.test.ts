import { describe, it } from "node:test";
import { Service } from "./service";
import { DieHardSolution, PossiblyVeryLongSolution } from "./service.models";

describe("Service tests", () => {
    describe("solvable cases", () => {
        test("should yield the correct answer for the 'Die Hard' water juggle riddle", () => {
            const service = new Service(5, 3);
            const expected = DieHardSolution;

            const actual = service.SolveRiddle(4);

            expect(actual).not.toBeNull();
            expect(actual!.length).toBe(expected.length);
        });

        test("should yield the shortest possible solution", () => {
            const service = new Service(2, 100);
            const expected = PossiblyVeryLongSolution;

            const actual = service.SolveRiddle(96);

            expect(actual).not.toBeNull();
            expect(actual!.length).toBe(expected.length);
        });

        test("should yield a result with the same ammount of steps for a given X, Y, Z inputs even when X and Y swap values", () => {
            const s1 = new Service(5, 3);
            const a = s1.SolveRiddle(4);

            const s2 = new Service(3, 5);
            const b = s2.SolveRiddle(4);

            expect(a).not.toBeNull();
            expect(b).not.toBeNull();
            expect(a!.length).toBe(b!.length);
        });
    });

    describe("unsolvable cases", () => {
        test("should return null in case there's no possible solution for the inputs provided", () => {
            const service = new Service(2, 6);

            const actual = service.SolveRiddle(5);

            expect(actual).toBe(null);
        });
    });
});