/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import { Components, JSX } from '@bees-ui/core';


interface BeesLayoutFooterProps {
  
  /**  */
  prefixCls?: Components.BeesLayoutFooter["prefixCls"]
  
  /**  */
  hasSider?: Components.BeesLayoutFooter["hasSider"]
  
  /**  */
  beTagName?: Components.BeesLayoutFooter["beTagName"]
}

interface BeesLayoutFooterEvents {
  
}

interface BeesLayoutFooterSlots {
  default: any
}
  
/* generated by Svelte v4.2.9 */
import {
	SvelteComponent,
	binding_callbacks,
	create_slot,
	detach,
	element,
	get_all_dirty_from_scope,
	get_slot_changes,
	init,
	insert,
	safe_not_equal,
	set_custom_element_data,
	transition_in,
	transition_out,
	update_slot_base
} from "svelte/internal";

import "svelte/internal/disclose-version";
import { createEventDispatcher, onMount } from 'svelte';

function create_fragment(ctx) {
	let bees_layout_footer;
	let current;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

	return {
		c() {
			bees_layout_footer = element("bees-layout-footer");
			if (default_slot) default_slot.c();
			set_custom_element_data(bees_layout_footer, "prefix-cls", /*prefixCls*/ ctx[0]);
			set_custom_element_data(bees_layout_footer, "has-sider", /*hasSider*/ ctx[1]);
			set_custom_element_data(bees_layout_footer, "be-tag-name", /*beTagName*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, bees_layout_footer, anchor);

			if (default_slot) {
				default_slot.m(bees_layout_footer, null);
			}

			/*bees_layout_footer_binding*/ ctx[7](bees_layout_footer);
			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*prefixCls*/ 1) {
				set_custom_element_data(bees_layout_footer, "prefix-cls", /*prefixCls*/ ctx[0]);
			}

			if (!current || dirty & /*hasSider*/ 2) {
				set_custom_element_data(bees_layout_footer, "has-sider", /*hasSider*/ ctx[1]);
			}

			if (!current || dirty & /*beTagName*/ 4) {
				set_custom_element_data(bees_layout_footer, "be-tag-name", /*beTagName*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(bees_layout_footer);
			}

			if (default_slot) default_slot.d(detaching);
			/*bees_layout_footer_binding*/ ctx[7](null);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let __ref;
	let __mounted = false;
	const dispatch = createEventDispatcher();
	let { prefixCls = undefined } = $$props;
	let { hasSider = undefined } = $$props;
	let { beTagName = undefined } = $$props;
	const getWebComponent = () => __ref;

	onMount(() => {
		__mounted = true;
	});

	const setProp = (prop, value) => {
		if (__ref) $$invalidate(3, __ref[prop] = value, __ref);
	};

	const onEvent = e => {
		e.stopPropagation();
		dispatch(e.type, e.detail);
	};

	function bees_layout_footer_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			__ref = $$value;
			$$invalidate(3, __ref);
		});
	}

	$$self.$$set = $$props => {
		if ('prefixCls' in $$props) $$invalidate(0, prefixCls = $$props.prefixCls);
		if ('hasSider' in $$props) $$invalidate(1, hasSider = $$props.hasSider);
		if ('beTagName' in $$props) $$invalidate(2, beTagName = $$props.beTagName);
		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
	};

	return [
		prefixCls,
		hasSider,
		beTagName,
		__ref,
		getWebComponent,
		$$scope,
		slots,
		bees_layout_footer_binding
	];
}

class BeesLayoutFooter extends SvelteComponent {
  $$prop_def: BeesLayoutFooterProps;
  $$events_def: BeesLayoutFooterEvents;
  $$slot_def: BeesLayoutFooterSlots;

  $on<K extends keyof BeesLayoutFooterEvents>(type: K, callback: (e: BeesLayoutFooterEvents[K]) => any): () => void {
	  return super.$on(type, callback);
	}

  $set($$props: Partial<BeesLayoutFooterProps>): void {
	  super.$set($$props);
	}

	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			prefixCls: 0,
			hasSider: 1,
			beTagName: 2,
			getWebComponent: 4
		});
	}

	get getWebComponent(): HTMLBeesLayoutFooterElement | undefined {
		return this.$$.ctx[4];
	}
}

export default BeesLayoutFooter;