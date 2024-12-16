import { Component, ComponentInterface, Element, Prop, h } from '@stencil/core';
import { computed, effect, ref } from '@vue/reactivity';
import { useConfigInject } from '../../config-provider';
import classNames from 'classnames';
import isVisible from '../is-visible';
import type { WaveProps } from './interface';
import useStyle from './style';
import { useWave } from './useWave';

@Component({
  tag: 'bees-wave',
  shadow: false,
})
export class Wave implements ComponentInterface, WaveProps {
  @Element() el!: HTMLElement;
  @Prop() disabled?: boolean;
  @Prop() component?: string;

  private containerRef = ref<HTMLElement | null>(null);

  componentDidLoad() {
    this.setupWaveEffect();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  private setupWaveEffect() {
    const { getPrefixCls } = useConfigInject();
    const prefixCls = getPrefixCls('wave');
    const { hashId } = useStyle(prefixCls);

    const { showWave, onClick, resetEffect } = useWave();

    const node = this.containerRef.value;
    if (!node || node.nodeType !== 1 || this.disabled) {
      return;
    }

    const onClickHandler = (e: MouseEvent) => {
      if (
        !isVisible(e.target as HTMLElement) ||
        !node.getAttribute ||
        node.getAttribute('disabled') ||
        (node as HTMLInputElement).disabled ||
        node.className.includes('disabled') ||
        node.className.includes('-leave')
      ) {
        return;
      }

      onClick(node, '');
    };

    node.addEventListener('click', onClickHandler, true);

    effect(() => {
      return () => {
        node.removeEventListener('click', onClickHandler, true);
        resetEffect(node);
      };
    });
  }

  private cleanup() {
    if (this.containerRef.value) {
      const node = this.containerRef.value;
      node.removeEventListener('click', () => {}, true);
    }
  }

  render() {
    const { getPrefixCls } = useConfigInject();
    const prefixCls = getPrefixCls('wave');
    const { hashId } = useStyle(prefixCls);

    const child = this.el.firstElementChild as HTMLElement;
    if (!child) return null;

    const ref = computed(() => {
      this.containerRef.value = child;
      return child;
    });

    const className = classNames(
      child.className,
      TARGET_CLS,
      {
        [hashId]: hashId,
      },
    );

    child.className = className;

    return <slot />;
  }
}

import { Wave } from './wave';
import { WaveEffect } from './wave-effect';
import type { WaveComponent } from './interface';

export { Wave, WaveEffect };
export type { WaveComponent };

// Register custom elements
customElements.define('bees-wave', Wave);
customElements.define('wave-effect', WaveEffect);
