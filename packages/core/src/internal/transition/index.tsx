import { FunctionalComponent, h, VNode } from '@stencil/core';

interface TransitionProps {
  appear?: boolean;
  name?: string;
  appearFromClass?: string;
  appearActiveClass?: string;
  appearToClass?: string;
  children?: VNode;
}

export const Transition: FunctionalComponent<TransitionProps> = (props, children, utils) => {
  const { appear, appearFromClass, appearActiveClass, appearToClass, children: child } = props;

  if (!child) {
    return null;
  }

  const classes = {
    ...(child.vattrs?.class || {}),
  };

  if (appear) {
    if (appearFromClass) {
      classes[appearFromClass] = true;
    }
    if (appearActiveClass) {
      classes[appearActiveClass] = true;
    }
    if (appearToClass) {
      appearToClass.split(' ').forEach((className) => {
        if (className) {
          classes[className] = true;
        }
      });
    }
  }

  return {
    ...child,
    vattrs: {
      ...child.vattrs,
      class: classes,
      onTransitionEnd: (e: TransitionEvent) => {
        if (appearFromClass) {
          classes[appearFromClass] = false;
        }
        if (appearActiveClass) {
          classes[appearActiveClass] = false;
        }
        if (appearToClass) {
          appearToClass.split(' ').forEach((className) => {
            if (className) {
              classes[className] = false;
            }
          });
        }
      },
    },
  };
};
