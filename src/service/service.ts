type BucketStep = {
    step: number,
    bucketX: number,
    bucketY: number,
    action: string
}

export class Service {
    private x_capacity: number;
    private y_capacity: number;
    private state: BucketStep;

    constructor(x_capacity: number, y_capacity: number) {
        this.x_capacity = x_capacity;
        this.y_capacity = y_capacity;
        this.state = { step: 0, bucketX: 0, bucketY: 0, action: '' };
    }

    private fillBucket = (jugs: BucketStep, key: string, max: number, step: number): BucketStep =>
        ({ ...jugs, [key]: max, step: step, action: `Fill bucket ${key === 'bucketX' ? 'X' : 'Y'}` });

    private emptyBucket = (jugs: BucketStep, key: string, step: number): BucketStep =>
        ({ ...jugs, [key]: 0, step: step, action: `Empty bucket ${key === 'bucketX' ? 'X' : 'Y'}` });

    private xToy = (state: BucketStep, step: number): BucketStep => {
        const quantityNeededToFillY = this.y_capacity - state.bucketY;

        return {
            step: step,
            bucketX: state.bucketX > quantityNeededToFillY ? state.bucketX - quantityNeededToFillY : 0,
            bucketY: state.bucketX > quantityNeededToFillY ? state.bucketY + quantityNeededToFillY : state.bucketY + state.bucketX,
            action: "Transfer from bucket X to bucket Y"
        }
    }

    private yTox = (state: BucketStep, step: number): BucketStep => {
        const quantityNeededToFillX = this.x_capacity - state.bucketX;

        return {
            step: step,
            bucketX: state.bucketY > quantityNeededToFillX ? state.bucketX + quantityNeededToFillX : state.bucketX + state.bucketY,
            bucketY: state.bucketY > quantityNeededToFillX ? state.bucketY - quantityNeededToFillX : 0,
            action: "Transfer from bucket Y to bucket X"
        }
    }

    private isRepeated = (path: Array<BucketStep>, pair: BucketStep): boolean =>
        !!path.find(p => p.bucketX === pair.bucketX && p.bucketY === pair.bucketY)

    SolveRiddle(target: number): BucketStep[] | null {
        const path: BucketStep[] = [];
        const queue: BucketStep[][] = [];

        path.push(this.state);
        queue.push(path);

        while (queue.length) {
            const lastPath = queue.shift()!;
            const lastState = lastPath[lastPath.length - 1];

            if (target === lastState.bucketX || target === lastState.bucketY) {
                const finalPath = lastPath.splice(1);
                finalPath.slice(-1)[0].action = finalPath.slice(-1)[0].action.concat(" ", "SOLVED")

                return finalPath;
            }

            const currentStep = lastPath.length;
            const states = new Set([
                this.fillBucket(lastState, 'bucketX', this.x_capacity, currentStep),
                this.fillBucket(lastState, 'bucketY', this.y_capacity, currentStep),
                this.xToy(lastState, currentStep),
                this.yTox(lastState, currentStep),
                this.emptyBucket(lastState, 'bucketX', currentStep),
                this.emptyBucket(lastState, 'bucketY', currentStep)
            ]);

            for (let s of states) {
                if (!this.isRepeated(lastPath, s)) {
                    const newPath = [...lastPath];
                    newPath.push(s);
                    queue.push(newPath);
                }
            }
        }

        return null;
    }

}
