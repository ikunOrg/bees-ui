import { Component, ComponentInterface, Prop, h } from '@stencil/core';
import { useConfigInject } from '../config-provider';

@Component({
  tag: 'bees-layout-footer',
})
export class Header implements ComponentInterface {
  @Prop({ reflect: true }) prefixCls: string;

  @Prop({ reflect: true }) hasSider: boolean = false;

  @Prop({ reflect: true }) beTagName: string;

  render() {
    const { prefixCls } = useConfigInject('layout-footer', this);
    return (
      <footer class={prefixCls.value}>
        <slot></slot>
      </footer>
    );
  }
}
