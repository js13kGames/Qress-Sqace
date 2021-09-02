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

    getFrame = (): HTMLCanvasElement => {
        const ret = this.frames[this.nextFrame];
        this.nextFrame = (this.nextFrame + 1) % this.frameCount;
        return ret;
    };

    draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        // ctx.fillStyle = `rgba(0,0,0,0.5)`;
        // ctx.fillRect(
        //     x - this.width / 2,
        //     y - this.height / 2,
        //     this.width,
        //     this.height
        // );

        ctx.drawImage(this.getFrame(), x - this.width / 2, y - this.height / 2);
    };
}
