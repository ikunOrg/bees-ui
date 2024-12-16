import { useConfigContextInject } from '@components/config-provider/context';
import { FunctionalComponent } from '@stencil/core';
import { ref } from '@vue/reactivity';
import useStyle from './style';
import classNames from 'classnames';
import useWave from './use-wave';
import isVisible from '@utils/isVisible';

interface WaveProps {
  component: 'Button';
  disabled: boolean;
}

export const Wave: FunctionalComponent<WaveProps> = (prsop, children, utils) => {
  const { component } = prsop;
  const { getPrefixCls } = useConfigContextInject();
  const containerRef = ref<HTMLElement>();

  // =================== Style ===================
  const prefixCls = getPrefixCls('wave');
  const [, hashId] = useStyle(ref(prefixCls));

  const showWave = useWave(containerRef, classNames(prefixCls, hashId), component);

  // =================== Click ===================
  const onClick = (e: MouseEvent) => {
    const node = containerRef.value;
    if (
      !isVisible(e.target as HTMLElement) ||
      // No need wave
      !node.getAttribute ||
      node.getAttribute('disabled') ||
      (node as HTMLInputElement).disabled ||
      node.className.includes('disabled') ||
      node.className.includes('-leave')
    ) {
      return;
    }
    showWave?.();
  };

  return utils.map(children, (child) => ({
    ...child,
    vattrs: {
      ...child.vattrs,
      ref: (el: HTMLElement) => {
        containerRef.value = el;
      },
      onclick: onClick,
    },
  }));
};
