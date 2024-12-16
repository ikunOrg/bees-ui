import { inject } from '@utils/store';
import { SizeType, configProviderKey, defaultConfigProvider } from '../context';
import { useInjectDisabled } from '../disabled-context';
import { useInjectSize } from '../size-context';
import { computed } from '@vue/reactivity';

export default (name: string, props: Record<string, any>) => {
  const sizeContext = useInjectSize();
  const disabledContext = useInjectDisabled();
  const configProvider = inject(configProviderKey, {
    ...defaultConfigProvider,
    // renderEmpty: (name?: string) => h(DefaultRenderEmpty, { componentName: name }),
  });
  const prefixCls = computed(() => configProvider.getPrefixCls(name, props.prefixCls));
  const direction = computed(() => props.direction ?? configProvider.direction?.value);
  const iconPrefixCls = computed(() => props.iconPrefixCls ?? configProvider.iconPrefixCls.value);
  const rootPrefixCls = computed(() => configProvider.getPrefixCls());
  const autoInsertSpaceInButton = computed(() => true);

  const size = computed(() => (props.size as SizeType) || sizeContext);
  const disabled = computed<boolean>(() => props.disabled ?? disabledContext.value);
  const csp = computed(() => props.csp);
  const wave = computed<{
    disabled?: boolean;
  }>(() => props.wave);

  return {
    prefixCls,
    direction,
    iconPrefixCls,
    rootPrefixCls,

    autoInsertSpaceInButton,

    size,
    disabled,
    csp,
    wave,
  };
};
