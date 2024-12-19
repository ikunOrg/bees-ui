import { Component, h, Element, Prop, State, Listen } from '@stencil/core';
import wrapperRaf from '@utils/raf';
import { getTargetWaveColor, validateNum } from './utils';
import { Transition } from '../../internal/transition';

@Component({
  tag: 'bees-wave-effect',
})
export class WaveEffect {
  @Element() el!: HTMLElement;

  @Prop() target!: HTMLElement;
  @Prop() waveClassName?: string;

  @State() color: string | null = null;
  @State() borderRadius: number[] = [];
  @State() left: number = 0;
  @State() top: number = 0;
  @State() width: number = 0;
  @State() height: number = 0;
  @State() enabled: boolean = false;

  private divRef?: HTMLDivElement;
  private resizeObserver?: ResizeObserver;
  private rafId?: number;
  private timeoutId?: number;

  private syncPos() {
    const nodeStyle = getComputedStyle(this.target);

    // Get wave color
    this.color = getTargetWaveColor(this.target);

    const isStatic = nodeStyle.position === 'static';

    // Rect
    const { borderLeftWidth, borderTopWidth } = nodeStyle;
    this.left = isStatic ? this.target.offsetLeft : validateNum(-parseFloat(borderLeftWidth));
    this.top = isStatic ? this.target.offsetTop : validateNum(-parseFloat(borderTopWidth));
    this.width = this.target.offsetWidth;
    this.height = this.target.offsetHeight;

    // Border radius
    const { borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius } = nodeStyle;

    this.borderRadius = [
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
    ].map((radius) => validateNum(parseFloat(radius)));
  }

  private clear() {
    clearTimeout(this.timeoutId);
    wrapperRaf.cancel(this.rafId);
    this.resizeObserver?.disconnect();
  }

  private removeDom() {
    const holder = this.divRef?.parentElement;
    if (holder?.parentElement) {
      holder.parentElement.removeChild(holder);
    }
  }

  componentDidLoad() {
    this.clear();

    this.timeoutId = window.setTimeout(() => {
      this.removeDom();
    }, 50000);

    if (this.target) {
      this.rafId = wrapperRaf(() => {
        this.syncPos();
        this.enabled = true;
      });

      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => this.syncPos());
        this.resizeObserver.observe(this.target);
      }
    }
  }

  disconnectedCallback() {
    this.clear();
  }

  @Listen('transitionend')
  onTransitionEnd(e: TransitionEvent) {
    if (e.propertyName === 'opacity') {
      this.removeDom();
    }
  }

  render() {
    if (!this.enabled) return null;

    const waveStyle = {
      left: `${this.left}px`,
      top: `${this.top}px`,
      width: `${this.width}px`,
      height: `${this.height}px`,
      borderRadius: this.borderRadius.map((radius) => `${radius}px`).join(' '),
      '--wave-color': this.color,
    };

    const waveElement = (
      <div
        ref={(el) => (this.divRef = el)}
        class={{
          [this.waveClassName]: true,
        }}
        style={waveStyle}
      />
    );

    return (
      <Transition
        appear={true}
        name="wave-motion"
        appearFromClass="wave-motion-appear"
        appearActiveClass="wave-motion-appear"
        appearToClass="wave-motion-appear wave-motion-appear-active"
      >
        {waveElement}
      </Transition>
    );
  }
}
