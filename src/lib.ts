export const getContext = (
    canvas: HTMLCanvasElement
): CanvasRenderingContext2D => {
    const ctx = canvas.getContext('2d');

    if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
        throw new Error('Failed to get 2D context');
    }

    return ctx;
};
