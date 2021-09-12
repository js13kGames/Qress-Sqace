import typescript from '@rollup/plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';

const compress = true;

export default {
    input: 'src/game.ts',
    output: {
        file: compress ? 'dist/game.min.js' : 'dist/game.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        typescript(),
        uglify({ compress }),
        copy({
            targets: [{ src: 'src/index.html', dest: 'dist' }],
        }),
    ],
};
