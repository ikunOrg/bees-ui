import { createStore } from '@stencil/store';

const store = createStore<Record<any, any>>({});

export default store;

export function inject<T>(key: symbol, defaultVal?: T) {
  const val = store.get(key as any);
  return (val as T) ?? (defaultVal as T);
}

export function provide(key: symbol, value: unknown) {
  return store.set(key as any, value);
}
