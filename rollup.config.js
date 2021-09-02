import typescript from '@rollup/plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/game.ts',
    output: {
        file: 'dist/game.min.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        typescript(),
        uglify({ compress: true }),
        copy({
            targets: [{ src: 'src/index.html', dest: 'dist' }],
        }),
    ],
};
