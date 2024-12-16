import { useConfigInject } from '../config-provider';
import { Component, ComponentInterface, Prop, h } from '@stencil/core';

@Component({
  tag: 'bees-layout-header',
})
export class Header implements ComponentInterface {
  @Prop({ reflect: true }) prefixCls: string;

  @Prop({ reflect: true }) hasSider: boolean = false;

  @Prop({ reflect: true }) beTagName: string;

  render() {
    const { prefixCls } = useConfigInject('layout-header', this);
    return (
      <header class={prefixCls.value}>
        <slot></slot>
      </header>
    );
  }
}
