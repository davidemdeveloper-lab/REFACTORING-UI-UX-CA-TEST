import React from 'react';
import { boxStyle } from './styles';
import { filterDOMProps } from '../utils/filterDOMProps';

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';

type IBoxProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof boxStyle> & { className?: string };

const Box = React.forwardRef<HTMLDivElement, IBoxProps>(function Box(
  { className, ...props },
  ref
) {
  const filteredProps = filterDOMProps(props);
  return (
    <div ref={ref} className={boxStyle({ class: className })} {...filteredProps} />
  );
});

Box.displayName = 'Box';
export { Box };
