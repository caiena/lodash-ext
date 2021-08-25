import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs    from "@rollup/plugin-commonjs"
import babel       from "@rollup/plugin-babel"
// import alias       from "@rollup/plugin-alias"
// import json        from "@rollup/plugin-json"
// import yaml        from "@rollup/plugin-yaml"

// import glob from "rollup-plugin-glob-import"
import { terser }   from "rollup-plugin-terser"

import pkg          from './package.json'

const plugins = [
  nodeResolve(),
  commonjs(),
  babel({
    babelHelpers: "bundled",
    exclude:      ["node_modules/**"]
  })
]


export default [
  // browser-friendly UMD build, all packed (no external dependency)
  {
    input: 'src/index.js',
    output: {
      name: '_',
      file: pkg.browser,
      format: 'umd'
    },
    // external: [],
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      name: '_',
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'umd'
    },
    // external: [],
    plugins: [
      ...plugins,
      terser() // minify js
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/index.js",
    output: [
      // XXX: exports: "default" pois exportamos apenas o default no entrypoint (src/index.js)!
      { file: pkg.main,   format: "cjs", sourcemap: true, exports: "default" },
      { file: pkg.module, format: "es",  sourcemap: true }
    ],
    // XXX: não vamos fazer lodash como external! vai empacotada junto!
    // external: ["lodash"],
    plugins
  }
]
