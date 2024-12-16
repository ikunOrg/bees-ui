import { defaultPrefixCls } from '@/components/config-provider';
import { GlobalToken } from '@/components/theme/interface';

export const TARGET_CLS = `${defaultPrefixCls}-wave-target`;

export interface ShowWaveEffect {
  (
    element: HTMLElement,
    info: {
      className: string;
      token: GlobalToken;
      component?: string;
    },
  ): void;
}

export interface WaveProps {
  disabled?: boolean;
  component?: string;
}
