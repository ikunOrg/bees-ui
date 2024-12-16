import { inject, provide } from '@components/_util/store';

export type DisabledType = boolean | undefined;
const DisabledContextKey = Symbol('DisabledContextKey');

export const useInjectDisabled = () => {
  return inject(DisabledContextKey, undefined);
};
export const useProviderDisabled = (disabled: DisabledType) => {
  const parentDisabled = useInjectDisabled();
  provide(DisabledContextKey, disabled ?? parentDisabled.value);
  return disabled;
};
