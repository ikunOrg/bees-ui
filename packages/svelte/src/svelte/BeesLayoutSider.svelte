
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let prefixCls = undefined;
export let collapsible = undefined;
export let collapsed = undefined;
export let defaultCollapsed = undefined;
export let reverseArrow = undefined;
export let width = undefined;
export let trigger = undefined;
export let collapsedWidth = undefined;
export let breakpoint = undefined;
export let theme = undefined;
export let zeroWidthTriggerStyle = undefined;



export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };

$: if (__mounted) setProp('zeroWidthTriggerStyle', zeroWidthTriggerStyle);

const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
};
</script>

<bees-layout-sider 
  prefix-cls={prefixCls}
  collapsible={collapsible}
  collapsed={collapsed}
  default-collapsed={defaultCollapsed}
  reverse-arrow={reverseArrow}
  width={width}
  trigger={trigger}
  collapsed-width={collapsedWidth}
  breakpoint={breakpoint}
  theme={theme}
  on:beesBreakpoint={onEvent}
  on:beesCollapse={onEvent}
  bind:this={__ref}
>
  <slot></slot>
</bees-layout-sider>
  