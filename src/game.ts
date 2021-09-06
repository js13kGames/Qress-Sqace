import Audio from './audio';
import Thingy from './thingy';
import { getContext } from './lib';
import { words4, words5 } from './words';
import { SheetItem } from './types';

let lastKey = '';
let lastKeyTime = 0;

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
    Audio.startMusic();

    console.log(`key=${e.key}, next=${nextLetter}`);

    // I should get e.timeStamp but idk how to sync it with audio
    // there is a good tolerance so it should not matter too much
    // lastKeyTime = e.timeStamp % Audio.mod;
    lastKeyTime = Audio.getTime();
    lastKey = e.key;

    let key;
    if (e.key === ' ') {
        key = '_';
    } else {
        key = e.key;
    }

    if (key === nextLetter) {
        currentPrefix += nextLetter;
        nextLetter = getNextLetter();

        if (!nextLetter) {
            if (tutorialFinished === tutorial.length - 1) {
                currentWord = words4[(words4.length * Math.random()) | 0] + '_';
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

const thingy = new Thingy(50, 200, 200, (i, ctx) => {
    // console.log(`drawing i=${i}`);
    // ctx.fillStyle = `rgb(0, ${i * 25}, 0)`;
    // ctx.fillRect(0, 0, 200, 200);

    // ctx.fillStyle = 'rgba(0,0,0,0.4)';
    // ctx.fillRect(0, 0, 200, 200);

    for (var j = 0; j <= Math.PI * 2; j += Math.PI / 4) {
        ctx.fillStyle = 'rgba(' + (255 - i * 2) + ', ' + (255 - i) + ', 255, 0.8)';
        ctx.fillRect(80 + Math.cos(j) * i * 3 + 30 - 15 * Math.random(), 80 + Math.sin(j) * i * 3 + 30 - 15 * Math.random(), 4 - i / 10, 4 - i / 10);
    }
});

const spaceship = new Thingy(50, 200, 200, (i, ctx) => {
    // console.log(`drawing i=${i}`);
    // ctx.fillStyle = `rgb(0, ${i * 25}, 0)`;
    // ctx.fillRect(0, 0, 200, 200);

    // ctx.fillStyle = 'rgba(0,0,0,0.4)';
    // ctx.fillRect(0, 0, 200, 200);

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(80, 100);
    ctx.lineTo(120, 100);
    ctx.closePath();
    ctx.fill();

    // for (let j = 0; j <= Math.PI; j += Math.PI / 32) {
    //     ctx.fillStyle = 'rgba(' + (255 - i * 2) + ', ' + (255 - i) + ', 255, 0.9)';
    //     ctx.fillRect(Math.random() * -5 + 102.5 + Math.cos(j) * i, 100 + Math.sin(j) * i, 3, 3);
    // }

    // for (let j = 0; j <= Math.PI; j += Math.PI / 32) {
    //     ctx.fillStyle = 'rgba(' + (255 - i * 2) + ', ' + (255 - i) + ', 255, 0.9)';
    //     ctx.fillRect(Math.random() * -10 + 105 + Math.cos(j) * i * 0.75, 100 + Math.sin(j) * i * 0.75, 3, 3);
    // }

    const i2 = 60 - i;

    // for (let j = Math.PI / 16; j <= Math.PI - Math.PI / 16; j += Math.PI / 64) {
    //     ctx.fillStyle = 'rgba(' + (255 - i * 2) + ', ' + (255 - i) + ', 255, 0.9)';
    //     ctx.fillRect(Math.random() * -20 + 110 + Math.cos(j) * i * 1.2, Math.random() * -20 + 110 + Math.sin(j) * i * 1.2, 2, 2);
    //     ctx.fillRect(Math.random() * -10 + 105 + Math.cos(j) * i * 1.1, Math.random() * -10 + 100 + Math.sin(j) * i * 1.1, 1, 1);
    //     ctx.fillRect(Math.random() * -20 + 110 + Math.cos(j) * i2 * 1.2, Math.random() * -20 + 110 + Math.sin(j) * i2 * 1.2, 2, 2);
    //     ctx.fillRect(Math.random() * -10 + 105 + Math.cos(j) * i2 * 1.1, Math.random() * -10 + 100 + Math.sin(j) * i2 * 1.1, 1, 1);
    // }

    for (let j = Math.PI / 4; j <= Math.PI - Math.PI / 4; j += Math.PI / 128) {
        ctx.fillStyle = 'rgba(' + (255 - i * 2) + ', ' + (255 - i) + ', 255, 0.9)';
        ctx.fillRect(
            Math.random() * -20 + 110 + Math.cos(j) * i * 0.6,
            Math.random() * -20 + 110 + Math.sin(j) * i * 0.6,
            Math.random() * 3,
            Math.random() * 3
        );
        ctx.fillRect(
            Math.random() * -10 + 105 + Math.cos(j) * i * 0.4,
            Math.random() * -10 + 100 + Math.sin(j) * i * 0.4,
            Math.random() * 3,
            Math.random() * 3
        );
        ctx.fillRect(
            Math.random() * -10 + 105 + Math.cos(j) * i * 0.2,
            Math.random() * -10 + 100 + Math.sin(j) * i * 0.2,
            Math.random() * 3,
            Math.random() * 3
        );
        ctx.fillRect(
            Math.random() * -20 + 110 + Math.cos(j) * i2 * 0.6,
            Math.random() * -20 + 110 + Math.sin(j) * i2 * 0.6,
            Math.random() * 3,
            Math.random() * 3
        );
        ctx.fillRect(
            Math.random() * -10 + 105 + Math.cos(j) * i2 * 0.4,
            Math.random() * -10 + 100 + Math.sin(j) * i2 * 0.4,
            Math.random() * 3,
            Math.random() * 3
        );
        ctx.fillRect(
            Math.random() * -10 + 105 + Math.cos(j) * i2 * 0.2,
            Math.random() * -10 + 100 + Math.sin(j) * i2 * 0.2,
            Math.random() * 3,
            Math.random() * 3
        );
    }
});

/******** */

let i = 0;

let x = 100;
let y = 100;

const nextWord = (len: number) => (len === 4 ? words4[(words4.length * Math.random()) | 0] : words5[(words5.length * Math.random()) | 0]);
let lastWord: string;
let lastWordColor = 'green';
let lastWordLetter = 0;
const getAudioLetter = (len: number) => {
    if (lastWordLetter === 0) {
        lastWord = nextWord(len);
        console.log({ lastWord });

        if (lastWordColor === 'green') {
            lastWordColor = 'red';
        } else {
            lastWordColor = 'green';
        }
    }

    const ret = lastWord[lastWordLetter++];
    if (lastWordLetter === lastWord.length) {
        lastWordLetter = 0;
    }
    return ret;
};

const drawNote = (o: SheetItem, toBeat: number, noteLevel?: number) => {
    ctx.fillStyle = o.hit ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)';

    if (!o.to) {
        o.to = (o.from + o.length) % Audio.MAX_TICK;
    }

    const l = (o.to - o.from) * 15;
    ctx.fillRect(40 + (o.slot - 1) * 125, 0.25 + 735 + -toBeat * 100 - l, 50, l);

    ctx.beginPath();
    ctx.arc(65 + (o.slot - 1) * 125, 735 + -toBeat * 100, 25, 0, Math.PI);
    ctx.fill();

    if (!o.label) {
        return;
    }
    ctx.font = '30px Arial';
    if (!o.letterLevel) {
        o.letterLevel = 0;
    }

    if (
        !o.letter ||
        (noteLevel && o.letterLevel + Audio.mod < Audio.getTimeNotMod()) //||
        // (noteLevel && o.letterLevel + Audio.mod - 32 * Audio.secondsPerBeat <= Audio.getTimeNotMod())
    ) {
        // console.log(`NEW o.letterLevel=${o.letterLevel}  - ${o.letterLevel + o.from * Audio.secondsPerBeat} < ${Audio.getTimeNotMod()}`);
        // o.letter = getAudioLetter(o.wordLen ?? 0);
        // o.letterColor = lastWordColor;
        // o.letterLevel = Audio.getTimeNotMod();
        // console.log(o.letterLevel);
        // debugger;
        // o.hit = false;
    }

    if (!o.letter) {
        return;
    }
    ctx.fillStyle = o.hit ? 'yellow' : o.letterColor || 'purple';
    ctx.fillText(
        `${o.letter.toUpperCase()}`, // {octave}${o.tone}- // toBeat=${toBeat}
        50 + (o.slot - 1) * 125 + 5,
        735 + -toBeat * 100 + 20 /* to put the letter to the middle */
    );

    thingy.draw(ctx, 50 + (o.slot - 1) * 125 + 5, 735 + -toBeat * 100 + 20, o.from * 2.5);
};

const draw = () => {
    i = (i + 1) % 255;
    ctx.fillStyle = `rgb(0,0,0,0.9)`;
    ctx.fillRect(0, 0, w, h);

    const offset = 0;
    ctx.fillStyle = `rgb(0, 0, 0)`;
    ctx.fillRect(offset, offset, 500, 1000);

    ctx.fillStyle = `white`;
    ctx.fillRect(offset, offset + 250 + 490, 500, 20);

    const p = Audio.getNext4th();
    ctx.fillStyle = `rgb(0, 255, 0)`;
    ctx.fillRect(offset, offset + (250 + p * 500), 500, 10);

    ctx.fillRect(offset, offset + -250 + p * 500, 500, 10);
    if (p <= 0.5) {
        ctx.fillRect(offset, offset + 500 + ((p * 500 + 250) % 500), 500, 10);
    }
    x = mouseX;
    y = mouseY;

    ctx.font = '50px Arial';
    ctx.fillText(currentWord, 100, 100);
    ctx.fillStyle = 'red';
    ctx.fillText(currentPrefix, 100, 100);

    // const tick = Audio.getTick();
    ctx.fillStyle = 'blue';
    ctx.font = '30px Arial';
    // ctx.fillText(
    //     `music frame: ${tick}, next4th: ${tick - (tick % 4)}, p=${p}`,
    //     200,
    //     200
    // );
    // ctx.fillText(`Audio.getLevel()=${Audio.getLevel()}`, 400, 500);
    // ctx.fillText(
    //     `
    //     audioTime=${Audio.getTime()}`,
    //     400,
    //     430
    // );

    ['rgba(255,255,255,0.5)', 'rgba(0,0,0,0.5)', 'rgba(255,255,255,0.5)', 'rgba(0,0,0,0.5)'].forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(i * 125, 0, 125, 1000);
    });

    const shipPanel = Math.floor(mouseX / 125);
    if (shipPanel < 4) {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(shipPanel * 125, 0, 125, 1000);
    }

    const audioTime = Audio.getTime();
    const auditTimeNotMod = Audio.getTimeNotMod();
    Audio.getObjectsInRange().forEach((o) => {
        const shouldPlayAt = o.from * Audio.secondsPerBeat;
        const noteLevel = Math.floor((auditTimeNotMod + shouldPlayAt - audioTime) / Audio.secondsPerBeat);

        if (o.letter === lastKey && lastKeyTime - 0.5 < shouldPlayAt && shouldPlayAt < lastKeyTime + 0.5) {
            // debugger;
            o.hit = true;
        }

        const toBeat = shouldPlayAt - audioTime;
        drawNote(o, toBeat, noteLevel);

        const shouldPlayAt2 = (o.from - Audio.MAX_TICK) * Audio.secondsPerBeat;
        // const noteLevel2 = Math.floor(
        //     (auditTimeNotMod + shouldPlayAt2) / Audio.secondsPerBeat
        // );
        const toBeat2 = shouldPlayAt2 - audioTime;
        drawNote(o, toBeat2);

        const shouldPlayAt3 = (o.from + Audio.MAX_TICK) * Audio.secondsPerBeat;
        const toBeat3 = shouldPlayAt3 - audioTime;
        drawNote(o, toBeat3);
    });

    // ctx.drawImage(thingy.getFrame(), x, y);
    spaceship.draw(ctx, x, y);

    window.requestAnimationFrame(draw);
};

const initSheet = () => {
    Audio.sheet.forEach((o) => {
        if (o.group == null) {
            return;
        }

        o.letter = getAudioLetter(o.wordLen ?? 0);

        console.log(`${o.from} letter=${o.letter}`);

        o.letterColor = lastWordColor;
        o.letterLevel = Audio.getTimeNotMod();
        // console.log(o.letterLevel);
        // debugger;
        o.hit = false;
    });
};

const main = () => {
    canvas = document.createElement('canvas');
    ctx = getContext(canvas);
    document.body.appendChild(canvas);
    resize();

    initSheet();

    window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', mousemove);
    document.addEventListener('keydown', keydown);
};

window.addEventListener('DOMContentLoaded', main, false);
