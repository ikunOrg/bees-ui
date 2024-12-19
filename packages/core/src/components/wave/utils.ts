export function validateNum(value: string | number): number {
  return Number.isNaN(Number(value)) ? 0 : Number(value);
}

export function getTargetWaveColor(node: HTMLElement): string {
  const { borderTopColor, borderColor, backgroundColor } = getComputedStyle(node);

  if (borderTopColor !== 'rgba(0, 0, 0, 0)') {
    return borderTopColor;
  }
  if (borderColor !== 'rgba(0, 0, 0, 0)') {
    return borderColor;
  }
  if (backgroundColor !== 'rgba(0, 0, 0, 0)') {
    return backgroundColor;
  }
  return 'rgba(0, 0, 0, 0.15)';
}
