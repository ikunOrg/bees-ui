import { Component, ComponentInterface, Prop, h, EventEmitter, Event } from '@stencil/core';
import { computed, shallowRef } from '@vue/reactivity';
import classNames from 'clsx';
import useStyle from './style';
import { ButtonHTMLType, ButtonShape, ButtonType, GroupSizeContext, Loading } from './buttonHelpers';
import { SizeType } from '@/components';
import { MouseEventHandler } from 'react';
import { useConfigInject } from '../config-provider';
import { useCompactItemContext } from '../space/Compact';

@Component({
  tag: 'bees-button',
})
export class Button implements ComponentInterface {
  @Prop({ reflect: true, mutable: true }) type: ButtonType;

  @Prop({ reflect: true }) size: SizeType = 'default';

  @Prop({ reflect: true }) loading: Loading;

  @Prop({ reflect: true }) disabled: boolean;

  @Prop({ reflect: true }) ghost: boolean;

  @Prop({ reflect: true }) block: boolean;

  @Prop({ reflect: true }) danger: boolean;

  @Prop({ reflect: true }) shape: ButtonShape;

  @Prop({ reflect: true }) prefixCls: string;

  @Prop({ reflect: true }) htmlType: ButtonHTMLType;

  @Prop({ reflect: true }) icon: string;

  @Prop({ reflect: true }) target: string;

  @Prop({ reflect: true }) href: string;

  @Prop({}) beeTitle: string;

  @Event({}) beeClick: EventEmitter<MouseEventHandler>;

  @Event({}) beeMousedown: EventEmitter<MouseEventHandler>;

  private isUnBorderedButtonType(type: ButtonType | undefined) {
    return type === 'text' || type === 'link';
  }

  render() {
    const { prefixCls, autoInsertSpaceInButton, direction, size } = useConfigInject('btn', this);
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const groupSizeContext = GroupSizeContext.useInject();

    const innerLoading = shallowRef<Loading>(false);
    const hasTwoCNChar = shallowRef(false);
    const autoInsertSpace = computed(() => autoInsertSpaceInButton.value !== false);
    console.log('autoInsertSpace', autoInsertSpace.value);

    const classes = computed(() => {
      const { type, shape = 'default', ghost, block, danger } = this;
      const pre = prefixCls.value;

      const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
      const sizeFullname = compactSize.value || groupSizeContext?.size || size.value;
      const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';

      return classNames(compactItemClassnames.value, {
        [hashId.value]: true,
        [`${pre}`]: true,
        [`${pre}-${shape}`]: shape !== 'default' && shape,
        [`${pre}-${type}`]: type,
        [`${pre}-${sizeCls}`]: sizeCls,
        [`${pre}-loading`]: innerLoading.value,
        [`${pre}-background-ghost`]: ghost && !this.isUnBorderedButtonType(type),
        [`${pre}-two-chinese-chars`]: hasTwoCNChar.value && autoInsertSpace.value,
        [`${pre}-block`]: block,
        [`${pre}-dangerous`]: !!danger,
        [`${pre}-rtl`]: direction.value === 'rtl',
      });
    });

    const buttonProps = {
      class: classes.value,
    };

    let buttonNode = (
      <bees-wave>
        <button {...buttonProps}>
          <slot></slot>
        </button>
      </bees-wave>
    );

    return wrapSSR(buttonNode);
  }
}
