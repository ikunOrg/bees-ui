import { createStore } from '@stencil/store';
import { ComputedRef, computed } from '@vue/reactivity';
import { PREFIX, ICONPREFIX, DEFAULT_DIRECTION } from '../_util/constant';
import { inject, provide } from '../_util/store';
import { Locale } from '../locale';
import { AliasToken, OverrideToken } from '../theme/interface';

export const defaultPrefixCls = 'ikun';

export type DirectionType = 'ltr' | 'rtl' | undefined;
export type SizeType = 'small' | 'middle' | 'large' | 'default' | undefined;

export interface ThemeConfig {
  token?: Partial<AliasToken>;
  components?: OverrideToken;
  hashed?: boolean;
  inherit?: boolean;
}

interface Store {
  componentSize: SizeType;
  theme: ThemeConfig;
  locale: Locale;
}

export const useConfigContext = createStore<Store>({
  theme: {},
  componentSize: 'middle',
  locale: {
    locale: 'zh-CN',
  },
});

export const configProviderKey = Symbol('configContext');

export interface ConfigProviderInnerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  iconPrefixCls: ComputedRef<string>;
  getPopupContainer?: ComputedRef<(triggerNode: HTMLElement) => HTMLElement>;
  direction?: ComputedRef<'ltr' | 'rtl'>;
}

export const defaultConfigProvider: ConfigProviderInnerProps = {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${PREFIX}-${suffixCls}` : PREFIX;
  },
  iconPrefixCls: computed(() => ICONPREFIX),
  getPopupContainer: computed(() => () => document.body),
  direction: computed(() => DEFAULT_DIRECTION),
};

export const useConfigContextInject = () => {
  return inject(configProviderKey, defaultConfigProvider);
};

export const useConfigContextProvider = (props: ConfigProviderInnerProps) => {
  return provide(configProviderKey, props);
};
