
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let prefixCls = undefined;
export let spinning = undefined;
export let size = undefined;
export let tip = undefined;
export let wrapperClassName = undefined;
export let delay = undefined;
export let indicator = undefined;



export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };



const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
};
</script>

<bees-spin 
  prefix-cls={prefixCls}
  spinning={spinning}
  size={size}
  tip={tip}
  wrapper-class-name={wrapperClassName}
  delay={delay}
  indicator={indicator}
  
  bind:this={__ref}
>
  <slot></slot>
</bees-spin>
  