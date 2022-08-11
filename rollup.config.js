import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './src/index.js',

  output: {
    file: './dist/drag-utils.js',
    format: 'umd',
    name: 'Drag'
  },
  
  plugins: [
    babel({
      exclude: './node_modules/**'
    }),
    resolve({})
  ]
}