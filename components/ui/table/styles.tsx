import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { isWeb } from '@gluestack-ui/utils/nativewind-utils';

const captionTableStyle = isWeb ? 'caption-bottom' : '';

export const tableStyle = tva({
  base: `table w-full border-separate border-spacing-y-[6px]`,
});

export const tableHeaderStyle = tva({
  base: '',
});

export const tableBodyStyle = tva({
  base: '',
});

export const tableFooterStyle = tva({
  base: '',
});

export const tableHeadStyle = tva({
  base: 'flex-1 px-6 py-[14px] text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-500)]',
});

export const tableRowStyleStyle = tva({
  base: 'border-0 border-b border-solid border-outline-200 bg-[var(--color-surface)] transition-colors duration-150 hover:bg-[rgba(196,123,44,0.05)]',
  variants: {
    isHeaderRow: {
      true: 'bg-[var(--color-background)]',
    },
    isFooterRow: {
      true: 'border-b-0 ',
    },
  },
});

export const tableDataStyle = tva({
  base: 'flex-1 px-6 py-[14px] text-left text-sm font-medium leading-5 text-[var(--color-neutral-800)]',
});

export const tableCaptionStyle = tva({
  base: `${captionTableStyle} px-6 py-[14px] text-[16px] font-normal leading-[22px] text-typography-800 bg-background-50 font-roboto`,
});
