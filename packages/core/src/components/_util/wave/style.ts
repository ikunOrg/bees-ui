import { FullToken, GenerateStyle, genComponentStyleHook } from '@/components/theme/internal';

export interface ComponentToken {}

interface WaveToken extends FullToken<'Wave'> {
  componentCls: string;
}

const genWaveStyle: GenerateStyle<WaveToken> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      background: 'transparent',
      pointerEvents: 'none',
      boxSizing: 'border-box',
      color: 'inherit',

      '&-click-animating-node': {
        position: 'absolute',
        borderRadius: 'inherit',
        border: '0 solid currentColor',
        opacity: 0.2,
        animationName: 'fadeEffect',
        animationDuration: '2s',
        animationTimingFunction: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
        animationFillMode: 'forwards',
        animationPlayState: 'paused',
        content: '""',
      },
    },
  };
};

export default genComponentStyleHook('Wave', (token) => [genWaveStyle(token)], {});
