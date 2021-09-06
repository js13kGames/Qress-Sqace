import { getContext } from './lib';

export default class Thingy {
    private frames: Array<HTMLCanvasElement>;
    private nextFrame: number = 0;

    constructor(
        public frameCount: number,
        public height: number,
        public width: number,
        public drawFrame: (frame: number, ctx: CanvasRenderingContext2D) => void
    ) {
        this.frames = new Array<HTMLCanvasElement>();

        for (let i = 0; i < frameCount; i++) {
            this.frames[i] = document.createElement('canvas');
            this.frames[i].width = width;
            this.frames[i].height = height;
            drawFrame(i, getContext(this.frames[i]));
        }

        // console.log(`thingy is ${width}x${height}`);
    }

    getFrame = (offset?: number): HTMLCanvasElement => {
        if (offset) {
            return this.frames[Math.floor(this.nextFrame + offset) % this.frameCount];
        }
        const ret = this.frames[this.nextFrame];
        this.nextFrame = (this.nextFrame + 1) % this.frameCount;
        return ret;
    };

    draw = (ctx: CanvasRenderingContext2D, x: number, y: number, offset?: number) => {
        // ctx.fillStyle = `rgba(0,0,0,0.5)`;
        // ctx.fillRect(
        //     x - this.width / 2,
        //     y - this.height / 2,
        //     this.width,
        //     this.height
        // );
        if (offset) {
            ctx.drawImage(this.getFrame(offset), x - this.width / 2, y - this.height / 2);
        } else {
            ctx.drawImage(this.getFrame(), x - this.width / 2, y - this.height / 2);
        }
    };
}
