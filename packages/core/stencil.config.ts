import { Config } from '@stencil/core';
import { stencilCachePath, stencilWWWPath } from '../../scripts/paths';
import dynamic from '@rollup/plugin-dynamic-import-vars';

const isDev = process.argv.includes('--mm');

export const config: Config = {
  autoprefixCss: true,
  sourceMap: true,
  namespace: 'Bees',
  cacheDir: stencilCachePath,
  buildEs5: 'prod',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      // copy: [{
      //   src: '../scripts/custom-elements',
      //   dest: 'components',
      //   warn: true
      // }],
      includeGlobalScripts: false,
    },
    {
      type: 'dist-hydrate-script',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      dir: stencilWWWPath,
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
  enableCache: true,
  transformAliasedImportPaths: true,
  globalScript: './src/global/ikun-global.ts',
  env: {
    version: require('./package.json').version,
  },
  preamble: '@vite-ignore',
  rollupPlugins: {
    before: [isDev ? undefined : dynamic()],
  },
};
