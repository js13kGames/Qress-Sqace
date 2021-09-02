import Audio from './audio';
import Thingy from './thingy';
import { getContext } from './lib';
import words from './words';

let tutorial = ['_qress_sqace', 'great_'];
let tutorialFinished = 0;

const sharedStart = (array: string[]) => {
    var A = array.concat().sort(),
        a1 = A[0],
        a2 = A[A.length - 1],
        L = a1.length,
        i = 0;
    while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
    return a1.substring(0, i);
};

// currentWord: string, currentPrefix: string
const getNextLetter = () => {
    if (currentWord === currentPrefix) {
        return null;
    }

    let shared = sharedStart([currentWord, currentPrefix]);

    if (currentWord[shared.length] === ' ') {
        currentPrefix += ' ';
        console.log('next letter: ', currentWord[shared.length + 1]);
        return currentWord[shared.length + 1];
    }

    console.log({ shared });
    console.log({ currentWord });
    console.log({ currentPrefix });

    return currentWord[shared.length];
};

let currentWord = tutorial[0];
let currentPrefix = '';
let nextLetter = getNextLetter();

let w: number;
let h: number;
let ctx: CanvasRenderingContext2D;
let mouseX: number;
let mouseY: number;

let canvas: HTMLCanvasElement;
let canvasRect: DOMRect;

/*** events */

const resize = () => {
    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = w;
    canvas.height = h;

    canvasRect = canvas.getBoundingClientRect();

    console.log(`resize. w=${w}, h=${h}`);
};

const mousemove = (e: MouseEvent) => {
    mouseX = e.clientX - canvasRect.left;
    mouseY = e.clientY - canvasRect.top;

    // console.log(`mouseX=${mouseX}, mouseY=${mouseY}`);
};

const keydown = (e: KeyboardEvent) => {
    console.log(`key=${e.key}, next=${nextLetter}`);

    let key;
    if (e.key === ' ') {
        key = '_';

        Audio.startMusic();
    } else {
        key = e.key;
    }

    if (key === nextLetter) {
        currentPrefix += nextLetter;
        nextLetter = getNextLetter();

        if (!nextLetter) {
            if (tutorialFinished === tutorial.length - 1) {
                currentWord = words[(words.length * Math.random()) | 0] + '_';
            } else {
                tutorialFinished++;
                currentWord = tutorial[tutorialFinished];
            }

            currentPrefix = '';
            nextLetter = getNextLetter();
        }
    }
};

/***************/

const thingy = new Thingy(50, 400, 400, (i, ctx) => {
    // console.log(`drawing i=${i}`);
    // ctx.fillStyle = `rgb(0, ${i * 25}, 0)`;
    // ctx.fillRect(0, 0, 200, 200);

    for (var j = 0; j <= Math.PI * 2; j += Math.PI / 4) {
        ctx.fillStyle =
            'rgba(' + (255 - i * 2) + ', ' + (255 - i) + ', 255, 0.8)';
        ctx.fillRect(
            200 + Math.cos(j) * i * 3 + 30 - 15 * Math.random(),
            200 + Math.sin(j) * i * 3 + 30 - 15 * Math.random(),
            4 - i / 10,
            4 - i / 10
        );
    }
});

let i = 0;

let x = 100;
let y = 100;

const draw = () => {
    i = (i + 1) % 255;
    ctx.fillStyle = `rgb(255, ${i}, 104)`;
    ctx.fillRect(0, 0, w, h);

    const offset = 0;
    ctx.fillStyle = `rgb(0, 0, 0)`;
    ctx.fillRect(offset, offset, 500, 1000);

    ctx.fillStyle = `white`;
    ctx.fillRect(offset, offset + 250 + 490, 500, 20);

    const p = Audio.getNext4th();

    // 0
    // 125
    // 625
    // 750

    // p=0   => 1=125, 2=625
    // p=0.5 => 1=125+250=375, 2=375+500=875%500=125
    // p=1   => 1=125+250+500=875, 2=125+500=625

    console.log(`p=${p}`);

    ctx.fillStyle = `rgb(0, 255, 0)`;
    ctx.fillRect(offset, offset + (250 + p * 500), 500, 10);

    ctx.fillRect(offset, offset + -250 + p * 500, 500, 10);
    if (p <= 0.5) {
        ctx.fillRect(offset, offset + 500 + ((p * 500 + 250) % 500), 500, 10);
    }

    // if (p >= 0.6) {
    //     console.log(`p=${p}`);
    //     thingy.draw(ctx, 250, 750);
    // }

    x = mouseX;
    y = mouseY;

    // ctx.drawImage(thingy.getFrame(), x, y);
    thingy.draw(ctx, x, y);

    ctx.font = '50px Arial';
    ctx.fillText(currentWord, 100, 100);
    ctx.fillStyle = 'red';
    ctx.fillText(currentPrefix, 100, 100);

    // if (x < mouseX) {
    //     x += 5;
    // } else {
    //     x -= 5;
    // }
    // if (y < mouseY) {
    //     y += 5;
    // } else {
    //     y -= 5;
    // }

    // if (x < 50) {
    //     x = 50;
    // } else if (x > w - 50) {
    //     x = w - 50;
    // }
    // if (y < 50) {
    //     y = 50;
    // } else if (y > h - 50) {
    //     y = h - 50;
    // }

    // ctx.fillStyle = 'blue';
    // ctx.font = '30px Arial';
    // ctx.fillText(
    //     `music frame: ${Audio.getTick()} - ${Audio.getPlaying()}`,
    //     200,
    //     (y = 200)
    // );

    // console.log(`percent to next 4th note: ${Audio.next4th()}`);

    window.requestAnimationFrame(draw);
};

const main = () => {
    console.log('hello :))');

    canvas = document.createElement('canvas');
    ctx = getContext(canvas);
    document.body.appendChild(canvas);

    resize();
    draw();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', mousemove);
    document.addEventListener('keydown', keydown);
};

window.addEventListener('DOMContentLoaded', main, false);
