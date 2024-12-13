import { Config } from '@stencil/core';
import { stencilCachePath, stencilWWWPath } from '../../scripts/paths';
import { vueOutputTarget as vueOutput } from '@stencil/vue-output-target';
import { reactOutputTarget as reactOutput } from '@stencil/react-output-target';
// import { svelteOutputTarget } from '@bees-ui/svelte-output-target';
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
    // Vue output target
    vueOutput({
      componentCorePackage: '@bees-ui/core',
      proxiesFile: '../vue/src/components.ts',
      includeDefineCustomElements: false,
      includePolyfills: false,
      loaderDir: '../vue/dist/loader',
    }),
    // React output target
    // reactOutput({
    //   proxiesFile: '../react/src/components.ts',
    //   includeDefineCustomElements: false,
    //   includePolyfills: false,
    //   loaderDir: '../react/dist/loader',
    // }),
    // Svelte output target
    // svelteOutputTarget({
    //   componentCorePackage: '@bees-ui/core',
    //   includePolyfills: false,
    //   includeDefineCustomElements: false,
    //   proxiesFile: '../svelte/src/components.ts',
    // }),
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
