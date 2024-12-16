import { inject, provide } from './store';

export interface Context<T> {
  Provider: (value: T) => void;
  Consumer: () => T;
}

export default function createContext<T>(defaultValue: T): Context<T> {
  const contextKey = Symbol('contextKey');

  function Provider(value: T) {
    provide(contextKey, value);
  }

  function Consumer(): T {
    return inject(contextKey, defaultValue);
  }

  return {
    Provider,
    Consumer,
  };
}
