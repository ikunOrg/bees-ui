import { useConfigContextInject } from '@components/config-provider/context';
import { FunctionalComponent } from '@stencil/core';
import { ref } from '@vue/reactivity';
import useStyle from './style';

interface WaveProps {
  component: 'Button';
  disabled: boolean;
}

export const Wave: FunctionalComponent<WaveProps> = (prsop, children, utils) => {
  // const { component, disabled } = prsop;
  const { getPrefixCls } = useConfigContextInject();
  const containerRef = ref<HTMLDivElement>();

  // =================== Style ===================
  const prefixCls = getPrefixCls('wave');
  const [,] = useStyle(ref(prefixCls));

  const div = document.createElement('div');
  div.addEventListener('click', (e) => {
    console.log('load', e);
  });

  // const showWave = useWave(containerRef, classNames(prefixCls, hashId), component);

  return utils.map(children, (child) => ({
    ...child,
    vattrs: {
      ...child.vattrs,
      ref: (el: HTMLDivElement) => {
        containerRef.value = el;
        if (el) {
          console.log('Element mounted:', el);
        }
      },
      onclick: (e) => {
        console.log('containerRef', e, containerRef.value);
      },
    },
  }));
};
