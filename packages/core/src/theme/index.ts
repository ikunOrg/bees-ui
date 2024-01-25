import getDesignToken from './getDesignToken';
import type { AliasToken, GlobalToken, MappingAlgorithm, OverrideToken } from './interface';
import { defaultConfig, useToken as useInternalToken } from './internal';
import compactAlgorithm from './themes/compact';
import darkAlgorithm from './themes/dark';
import defaultAlgorithm from './themes/default';
import type { GenStyleFn } from './util/genComponentStyleHook';

type ComponentsConfig = {
  [key in keyof OverrideToken]?: OverrideToken[key] & {
    algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
  };
};

export interface ThemeConfig {
  token?: Partial<AliasToken>;
  components?: ComponentsConfig;
  algorithm?: MappingAlgorithm | MappingAlgorithm[];
  hashed?: boolean;
  inherit?: boolean;
  cssVar?:
    | {
        /**
         * Prefix for css variable, default to `ant`.
         */
        prefix?: string;
        /**
         * Unique key for theme, should be set manually < react@18.
         */
        key?: string;
      }
    | boolean;
}

// ZombieJ: We export as object to user but array in internal.
// This is used to minimize the bundle size for antd package but safe to refactor as object also.
// Please do not export internal `useToken` directly to avoid something export unexpected.
/** Get current context Design Token. Will be different if you are using nest theme config. */
function useToken() {
  const [theme, token, hashId] = useInternalToken();

  return { theme, token, hashId };
}

export type { GlobalToken, MappingAlgorithm, GenStyleFn };

export default {
  /** @private Test Usage. Do not use in production. */
  defaultConfig,

  /** Default seedToken */
  defaultSeed: defaultConfig.token,

  useToken,
  defaultAlgorithm,
  darkAlgorithm,
  compactAlgorithm,
  getDesignToken,
};
