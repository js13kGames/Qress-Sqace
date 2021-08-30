// https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/API/Web_Audio_API/Simple_synth/_sample_.The_video_keyboard.html

let noteFreq: { [index: string]: number }[] = [];
for (let i = 0; i < 9; i++) {
    noteFreq[i] = [] as unknown as { [index: string]: number };
}

noteFreq[0]['A'] = 27.5;
noteFreq[0]['A#'] = 29.135235094880619;
noteFreq[0]['B'] = 30.867706328507756;

noteFreq[1]['C'] = 32.703195662574829;
noteFreq[1]['C#'] = 34.647828872109012;
noteFreq[1]['D'] = 36.708095989675945;
noteFreq[1]['D#'] = 38.890872965260113;
noteFreq[1]['E'] = 41.203444614108741;
noteFreq[1]['F'] = 43.653528929125485;
noteFreq[1]['F#'] = 46.249302838954299;
noteFreq[1]['G'] = 48.999429497718661;
noteFreq[1]['G#'] = 51.913087197493142;
noteFreq[1]['A'] = 55.0;
noteFreq[1]['A#'] = 58.270470189761239;
noteFreq[1]['B'] = 61.735412657015513;

noteFreq[2]['C'] = 65.406391325149658;
noteFreq[2]['C#'] = 69.295657744218024;
noteFreq[2]['D'] = 73.41619197935189;
noteFreq[2]['D#'] = 77.781745930520227;
noteFreq[2]['E'] = 82.406889228217482;
noteFreq[2]['F'] = 87.307057858250971;
noteFreq[2]['F#'] = 92.498605677908599;
noteFreq[2]['G'] = 97.998858995437323;
noteFreq[2]['G#'] = 103.826174394986284;
noteFreq[2]['A'] = 110.0;
noteFreq[2]['A#'] = 116.540940379522479;
noteFreq[2]['B'] = 123.470825314031027;

noteFreq[3]['C'] = 130.812782650299317;
noteFreq[3]['C#'] = 138.591315488436048;
noteFreq[3]['D'] = 146.83238395870378;
noteFreq[3]['D#'] = 155.563491861040455;
noteFreq[3]['E'] = 164.813778456434964;
noteFreq[3]['F'] = 174.614115716501942;
noteFreq[3]['F#'] = 184.997211355817199;
noteFreq[3]['G'] = 195.997717990874647;
noteFreq[3]['G#'] = 207.652348789972569;
noteFreq[3]['A'] = 220.0;
noteFreq[3]['A#'] = 233.081880759044958;
noteFreq[3]['B'] = 246.941650628062055;

noteFreq[4]['C'] = 261.625565300598634;
noteFreq[4]['C#'] = 277.182630976872096;
noteFreq[4]['D'] = 293.66476791740756;
noteFreq[4]['D#'] = 311.12698372208091;
noteFreq[4]['E'] = 329.627556912869929;
noteFreq[4]['F'] = 349.228231433003884;
noteFreq[4]['F#'] = 369.994422711634398;
noteFreq[4]['G'] = 391.995435981749294;
noteFreq[4]['G#'] = 415.304697579945138;
noteFreq[4]['A'] = 440.0;
noteFreq[4]['A#'] = 466.163761518089916;
noteFreq[4]['B'] = 493.883301256124111;

noteFreq[5]['C'] = 523.251130601197269;
noteFreq[5]['C#'] = 554.365261953744192;
noteFreq[5]['D'] = 587.32953583481512;
noteFreq[5]['D#'] = 622.253967444161821;
noteFreq[5]['E'] = 659.255113825739859;
noteFreq[5]['F'] = 698.456462866007768;
noteFreq[5]['F#'] = 739.988845423268797;
noteFreq[5]['G'] = 783.990871963498588;
noteFreq[5]['G#'] = 830.609395159890277;
noteFreq[5]['A'] = 880.0;
noteFreq[5]['A#'] = 932.327523036179832;
noteFreq[5]['B'] = 987.766602512248223;

noteFreq[6]['C'] = 1046.502261202394538;
noteFreq[6]['C#'] = 1108.730523907488384;
noteFreq[6]['D'] = 1174.659071669630241;
noteFreq[6]['D#'] = 1244.507934888323642;
noteFreq[6]['E'] = 1318.510227651479718;
noteFreq[6]['F'] = 1396.912925732015537;
noteFreq[6]['F#'] = 1479.977690846537595;
noteFreq[6]['G'] = 1567.981743926997176;
noteFreq[6]['G#'] = 1661.218790319780554;
noteFreq[6]['A'] = 1760.0;
noteFreq[6]['A#'] = 1864.655046072359665;
noteFreq[6]['B'] = 1975.533205024496447;

noteFreq[7]['C'] = 2093.004522404789077;
noteFreq[7]['C#'] = 2217.461047814976769;
noteFreq[7]['D'] = 2349.318143339260482;
noteFreq[7]['D#'] = 2489.015869776647285;
noteFreq[7]['E'] = 2637.020455302959437;
noteFreq[7]['F'] = 2793.825851464031075;
noteFreq[7]['F#'] = 2959.955381693075191;
noteFreq[7]['G'] = 3135.963487853994352;
noteFreq[7]['G#'] = 3322.437580639561108;
noteFreq[7]['A'] = 3520.0;
noteFreq[7]['A#'] = 3729.310092144719331;
noteFreq[7]['B'] = 3951.066410048992894;

noteFreq[8]['C'] = 4186.009044809578154;

let mainGainNode: GainNode;

const lookahead = 25;
const scheduleAheadTime = 0.5;
let nextNoteTime = 0.0;

// @ts-ignore
var _audC = new (window.AudioContext || window.webkitAudioContext)();

let noiseDuration = 0.2;
let bandHz = 1000;
let noteCnt = 0;
const playNoise = (time: number) => {
    noteCnt++;
    bandHz = 600 + noteCnt * 100;
    if (noteCnt % 16 === 0) {
        noteCnt = 0;
    }

    const bufferSize = _audC.sampleRate * noiseDuration; // set the time of the note
    const buffer = _audC.createBuffer(1, bufferSize, _audC.sampleRate); // create an empty buffer
    const data = buffer.getChannelData(0); // get data

    // fill the buffer with noise
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    // create a buffer source for our created data
    const noise = _audC.createBufferSource();
    noise.buffer = buffer;

    const bandpass = _audC.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = bandHz;

    // connect our graph
    noise.connect(bandpass).connect(_audC.destination);
    noise.start(time);
};

function playTone(time: number, tone: number) {
    let osc = _audC.createOscillator();
    osc.connect(mainGainNode);
    osc.type = 'square';
    osc.frequency.value = tone;
    osc.start(time);
    return osc;
}

const sheet: {
    tone: number;
    from: number;
    to: number;
    osc?: OscillatorNode;
}[] = [
    // I made this "song" by hand in file editor :D
    { tone: noteFreq[3]['A'], from: 0, to: 16 }, // bass
    { tone: noteFreq[5]['C'], from: 0, to: 1 },
    { tone: noteFreq[4]['B'], from: 2, to: 3 },
    { tone: noteFreq[5]['C'], from: 4, to: 5 },
    { tone: noteFreq[4]['A'], from: 6, to: 10 },

    { tone: noteFreq[3]['G'], from: 16, to: 32 }, // bass
    { tone: noteFreq[5]['C'], from: 16, to: 17 },
    { tone: noteFreq[4]['B'], from: 18, to: 19 },
    { tone: noteFreq[5]['C'], from: 20, to: 21 },
    { tone: noteFreq[4]['G'], from: 22, to: 26 },

    { tone: noteFreq[3]['D'], from: 32, to: 48 }, // bass
    { tone: noteFreq[5]['C'], from: 32, to: 33 },
    { tone: noteFreq[4]['B'], from: 34, to: 35 },
    { tone: noteFreq[5]['C'], from: 36, to: 37 },
    { tone: noteFreq[5]['D'], from: 38, to: 42 },

    { tone: noteFreq[3]['G'], from: 48, to: 0 }, // bass
    { tone: noteFreq[5]['E'], from: 48, to: 51 },
    { tone: noteFreq[5]['E'], from: 52, to: 53 },
    { tone: noteFreq[5]['D'], from: 54, to: 57 },
    { tone: noteFreq[5]['C'], from: 58, to: 60 },
    { tone: noteFreq[4]['A'], from: 60, to: 62 },
];

let tickCnt = 0;
const tick = (nextNoteTime: number) => {
    if (tickCnt % 4 === 0) {
        playNoise(nextNoteTime);
    }

    sheet.forEach((sheet) => {
        if (tickCnt === sheet.from) {
            sheet.osc = playTone(nextNoteTime, sheet.tone);
        }

        if (tickCnt === sheet.to) {
            if (sheet.osc) {
                sheet.osc.stop(nextNoteTime);
            }
        }
    });

    tickCnt++;
    if (tickCnt % 64 === 0) {
        tickCnt = 0;
    }
};

const scheduler = () => {
    while (nextNoteTime < _audC.currentTime + scheduleAheadTime) {
        tick(nextNoteTime);
        const secondsPerBeat = 60.0 / (180 * 4);
        nextNoteTime += secondsPerBeat;
    }
    window.setTimeout(scheduler, lookahead);
};

let onlyOnce = false;
const startMusic = () => {
    if (onlyOnce) {
        return;
    }
    onlyOnce = true;

    mainGainNode = _audC.createGain();
    mainGainNode.connect(_audC.destination);
    mainGainNode.gain.value = 0.5;

    nextNoteTime = _audC.currentTime;
    scheduler();
};

export default { startMusic };
