import { computed, ref } from '@vue/reactivity';
import { useStyleRegister } from '../../../internal/cssinjs';
import type { CSSObject } from '../../../internal/cssinjs';
import { useConfigContextInject } from '@/components/config-provider/context';

export function useWave() {
  const { getPrefixCls, theme } = useConfigContextInject();
  const prefixCls = getPrefixCls('wave');

  const showWave = ref(false);
  const waveColor = ref('');
  const isInserted = ref(false);
  const clickWaveTimeoutId = ref<number>();
  const animationStartId = ref<number>();
  const extraNode = ref<HTMLDivElement | null>(null);

  const insertExtraNode = () => {
    const extraNode = document.createElement('div');
    extraNode.style.position = 'absolute';
    extraNode.style.left = '0px';
    extraNode.style.top = '0px';
    extraNode.className = `${prefixCls}-click-animating-node`;
    return extraNode;
  };

  const onClick = (node: HTMLElement, color: string) => {
    if (!node || isInserted.value || node.nodeType !== 1) {
      return;
    }

    isInserted.value = true;
    extraNode.value = insertExtraNode();
    node.appendChild(extraNode.value);

    // Get wave color from target
    const computedStyle = getComputedStyle(node);
    const borderColor =
      computedStyle.getPropertyValue('border-top-color') || // Firefox Compatible
      computedStyle.getPropertyValue('border-color') ||
      computedStyle.getPropertyValue('background-color');

    clickWaveTimeoutId.value = window.setTimeout(() => {
      if (extraNode.value) {
        extraNode.value.style.animationName = 'fadeEffect';
        extraNode.value.style.borderColor = color || borderColor;
      }
    }, 0);

    // Clean up
    animationStartId.value = window.setTimeout(() => {
      resetEffect(node);
    }, 500);
  };

  const resetEffect = (node: HTMLElement) => {
    if (!node || node.nodeType !== 1) {
      return;
    }

    isInserted.value = false;
    if (clickWaveTimeoutId.value) {
      clearTimeout(clickWaveTimeoutId.value);
    }
    if (animationStartId.value) {
      clearTimeout(animationStartId.value);
    }
    if (extraNode.value && node.contains(extraNode.value)) {
      node.removeChild(extraNode.value);
    }
    extraNode.value = null;
  };

  const getWaveStyle = (): CSSObject => ({
    [`
      .${prefixCls}-click-animating-node {
        box-sizing: border-box;
        position: absolute;
        border-radius: inherit;
        border: 0 solid ${waveColor.value || '#1677ff'};
        opacity: 0.2;
        animation: fadeEffect 2s cubic-bezier(0.08, 0.82, 0.17, 1), waveEffect 0.4s cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-fill-mode: forwards;
        display: block;
        pointer-events: none;
      }
      @keyframes fadeEffect {
        100% {
          opacity: 0;
        }
      }
      @keyframes waveEffect {
        100% {
          top: -6px;
          left: -6px;
          bottom: -6px;
          right: -6px;
          border-width: 6px;
        }
      }
    `]: {},
  });

  // Inject wave styles
  const { hashId } = useStyleRegister(
    computed(() => ({
      theme: theme.value,
      token: {},
      hashId: '',
      path: ['wave'],
    })),
    () => [getWaveStyle()],
  );

  return {
    showWave,
    onClick,
    resetEffect,
  };
}
