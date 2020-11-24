const { build } = require('esbuild');
const glob = require('glob');
const fs = require('fs');

build({
    entryPoints: ['./smartweave/projects.ts', './smartweave/contracts.ts'],
    outdir: './dist',
    minify: false,
    bundle: false
}).catch(() => process.exit(1));