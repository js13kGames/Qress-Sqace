export type SheetItem = {
    octave: number;
    tone: string;
    from: number;
    to?: number;
    slot: number;
    label?: string;
    osc?: OscillatorNode;
    wordLen?: number;
    letter?: string;
    letterColor?: string;
    length: number;

    hit?: boolean; // was the note hit?
    letterLevel?: number; // on what level was the letter generated
    group?: number;
};
