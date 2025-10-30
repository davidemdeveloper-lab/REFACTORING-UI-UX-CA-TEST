import React from 'react';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { vstackStyle } from './styles';
import { filterDOMProps } from '../utils/filterDOMProps';

type IVStackProps = React.ComponentProps<'div'> &
  VariantProps<typeof vstackStyle>;

const VStack = React.forwardRef<React.ComponentRef<'div'>, IVStackProps>(
  function VStack({ className, space, reversed, ...props }, ref) {
    const filteredProps = filterDOMProps(props);
    return (
      <div
        className={vstackStyle({
          space,
          reversed: reversed as boolean,
          class: className,
        })}
        {...filteredProps}
        ref={ref}
      />
    );
  }
);

VStack.displayName = 'VStack';

export { VStack };
