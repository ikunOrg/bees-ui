import { Ref } from '@vue/reactivity';
import { showWaveEffect } from './use-effect-wave';

export default function useWave(node: Ref<HTMLElement>, className: string, wave: string): VoidFunction {
  function showWave() {
    if (!node) {
      return;
    }
    showWaveEffect(node.value, className);
  }

  return showWave;
}
