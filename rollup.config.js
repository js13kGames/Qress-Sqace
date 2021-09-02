import typescript from '@rollup/plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/game.ts',
    output: {
        // dir: 'dist',
        file: 'hehe.min.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [typescript(), uglify({ compress: true })],
};
