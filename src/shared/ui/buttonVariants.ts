import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'flex h-13 w-full items-center rounded-xl px-4 py-0',
  {
    variants: {
      variant: {
        primary:
          'text-body-sb-16 bg-mint-300 text-white active:bg-mint-400 disabled:bg-gray-50 disabled:text-gray-200',
        secondary:
          'text-body-sb-16 border border-gray-200 bg-white text-gray-800 active:border-mint-200 active:bg-mint-50 active:text-mint-300 disabled:text-gray-200',
        neutral:
          'text-body-m-15 bg-gray-50 text-gray-800 active:bg-gray-100 disabled:text-gray-200',
        login: 'text-body-m-15 text-gray-800',
      },
      align: {
        left: 'justify-start gap-3',
        center: 'relative justify-center',
      },
    },
    defaultVariants: {
      variant: 'primary',
      align: 'center',
    },
  },
);
