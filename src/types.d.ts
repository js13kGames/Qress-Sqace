export type SheetItem = {
    octave: number;
    tone: string;
    from: number;
    to: number;
    slot: number;
    label?: string;
    osc?: OscillatorNode;
    wordLen?: number;
    letter?: string;
    letterColor?: string;
};
