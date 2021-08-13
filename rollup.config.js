import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/game.ts',
    output: {
        dir: 'dist',
        format: 'cjs',
    },
    plugins: [typescript()],
};
