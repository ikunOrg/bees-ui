import { Ref } from '@vue/reactivity';

export default function useWave(node: Ref<HTMLElement>, className: string, wave: string): VoidFunction {
  function showWave() {
    if (!node) {
      return;
    }
    showWaveEffect(node.value, className);
  }

  return showWave;
}
export function showWaveEffect(node: HTMLElement, waveClassName: string) {
  console.log('showWaveEffect', node, waveClassName);

  const holder = document.createElement('div');
  holder.style.position = 'absolute';
  holder.style.left = `0px`;
  holder.style.top = `0px`;
  node.parentNode?.appendChild(holder);
  const wave = document.createElement('bees-wave-effect') as unknown as any;
  wave.target = node;
  wave.waveClassName = waveClassName;

  holder.appendChild(wave as unknown as Node);
}
