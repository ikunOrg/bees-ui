// import { defaultPrefixCls } from '../../config-provider';

import { GlobalToken } from '@theme/interface';

export const TARGET_CLS = `ikun-wave-target`;

export type ShowWaveEffect = (
  element: HTMLElement,
  info: {
    className: string;
    token: GlobalToken;
    component?: WaveComponent;
    event: MouseEvent;
    hashId: string;
  },
) => void;

export type ShowWave = (event: MouseEvent) => void;

export type WaveComponent = 'Tag' | 'Button' | 'Checkbox' | 'Radio' | 'Switch';

export interface WaveProps {
  disabled?: boolean;
  color?: string;
}

export interface UseWaveOptions {
  color?: string;
  duration?: number;
}
