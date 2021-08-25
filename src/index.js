import lodashExt from './lodash-ext'


// XXX: manter apenas o export default, pois o rollup está configurado para cjs com
// output.exports: "default"!
// - se formos trocar aqui para mais exports, precisamos alterar a config para cjs no rollup.config.js!
export default lodashExt
