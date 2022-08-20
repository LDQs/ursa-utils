import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    sourcemap: true,
    format: 'cjs'
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      babelrc: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: [/node_modules/],
    })
  ]
}
