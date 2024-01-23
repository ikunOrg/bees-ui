
<script>
import { createEventDispatcher, onMount } from 'svelte';

let __ref;
let __mounted = false;

const dispatch = createEventDispatcher();

export let prefixCls = undefined;
export let hasSider = undefined;
export let beTagName = undefined;



export const getWebComponent = () => __ref;

onMount(() => { __mounted = true; });

const setProp = (prop, value) => { if (__ref) __ref[prop] = value; };



const onEvent = (e) => {
  e.stopPropagation();
  dispatch(e.type, e.detail);
};
</script>

<bees-layout-footer 
  prefix-cls={prefixCls}
  has-sider={hasSider}
  be-tag-name={beTagName}
  
  bind:this={__ref}
>
  <slot></slot>
</bees-layout-footer>
  