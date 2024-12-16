import { inject, provide } from '@components/_util/store';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

const SizeContextKey = Symbol('SizeContextKey');

export const useInjectSize = () => {
  return inject<SizeType>(SizeContextKey, undefined as SizeType);
};

export const useProvideSize = (size: SizeType) => {
  const parentSize = useInjectSize();
  provide(SizeContextKey, size || parentSize.value);
  return size;
};
