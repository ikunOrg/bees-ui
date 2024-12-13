import { Component, h, Element, Listen } from '@stencil/core';
// import useStyle from './style';
// import { useConfigInject } from '@components/config-provider';

@Component({
  tag: 'bees-wave',
  shadow: false,
})
export class Wave {
  @Element() el!: HTMLElement;
  private instance?: HTMLDivElement;
  private clickWaveTimeoutId?: number;
  private animationStartId?: number;
  private animationStart = false;
  private destroyed = false;

  @Listen('click')
  onClick() {
    const node = this.el;
    if (!node || node.nodeType !== 1) {
      return;
    }
    this.resetEffect(node);
  }
  //   const { prefixCls } = useConfigInject('wave', this);
  //   const [, hashId] = useStyle(prefixCls);

  private getWaveColor(node: HTMLElement): string {
    const { borderTopColor, borderColor, backgroundColor } = getComputedStyle(node);
    return borderTopColor || borderColor || backgroundColor;
  }

  private resetEffect(node: HTMLElement) {
    if (!node || node.nodeType !== 1 || this.destroyed) {
      return;
    }

    const waveColor = this.getWaveColor(node);
    const nodeStyle = getComputedStyle(node);

    // Create wave effect
    this.instance = document.createElement('div');
    this.instance.className = 'bees-wave';
    Object.assign(this.instance.style, {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      borderRadius: nodeStyle.borderRadius,
      border: `2px solid ${waveColor}`,
      transform: 'scale(0.5)',
      opacity: '0.5',
      pointerEvents: 'none',
      transition: 'all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1)',
    });

    node.appendChild(this.instance);

    this.animationStartId = requestAnimationFrame(() => {
      if (this.instance) {
        this.instance.style.transform = 'scale(1)';
        this.instance.style.opacity = '0';
      }
    });

    this.clickWaveTimeoutId = window.setTimeout(() => {
      this.onTransitionEnd();
    }, 400);
  }

  private onTransitionEnd() {
    if (!this.animationStart || !this.instance) {
      return;
    }

    const node = this.el;
    if (node) {
      node.removeChild(this.instance);
    }
    this.instance = undefined;
    this.clickWaveTimeoutId = undefined;
    this.animationStart = false;
  }

  disconnectedCallback() {
    this.destroyed = true;
    if (this.clickWaveTimeoutId) {
      clearTimeout(this.clickWaveTimeoutId);
    }
    if (this.animationStartId) {
      cancelAnimationFrame(this.animationStartId);
    }
    this.onTransitionEnd();
  }

  render() {
    return <slot />;
  }
}
