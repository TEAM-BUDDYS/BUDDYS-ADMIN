import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '../utils/cn';

const buttonVariants = cva(
  'flex h-13 w-full items-center rounded-xl px-4 py-0',
  {
    variants: {
      variant: {
        primary:
          'text-body-sb-16 bg-mint-300 text-white enabled:active:bg-mint-400 disabled:bg-gray-50 disabled:text-gray-200',
        secondary:
          'text-body-sb-16 border border-gray-200 bg-white text-gray-800 enabled:active:border-mint-200 enabled:active:bg-mint-50 enabled:active:text-mint-300 disabled:text-gray-200',
        neutral:
          'text-body-m-15 bg-gray-50 text-gray-800 enabled:active:bg-gray-100 disabled:text-gray-200',
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

const buttonIconVariants = cva(
  'inline-flex items-center text-current [&>svg]:size-full [&>svg]:shrink-0',
  {
    variants: {
      iconSize: {
        sm: 'size-[20px]',
        lg: 'size-[24px]',
      },
    },
    defaultVariants: {
      iconSize: 'sm',
    },
  },
);

type ButtonElementProps = ComponentPropsWithRef<'button'>;

type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>['variant']
>;

type ButtonAlign = NonNullable<VariantProps<typeof buttonVariants>['align']>;

type ButtonIconSize = NonNullable<
  VariantProps<typeof buttonIconVariants>['iconSize']
>;

export interface ButtonProps extends Omit<ButtonElementProps, 'children'> {
  variant?: ButtonVariant;
  align?: ButtonAlign;
  icon?: ReactNode;
  iconSize?: ButtonIconSize;
  children: ReactNode;
}

export const Button = ({
  ref,
  variant,
  align = 'center',
  icon,
  iconSize,
  className,
  children,
  type = 'button',
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      {...buttonProps}
      type={type}
      className={cn(buttonVariants({ variant, align }), className)}
    >
      {icon ? (
        <span
          aria-hidden
          className={cn(
            buttonIconVariants({ iconSize }),
            align === 'center' ? 'absolute left-4' : null,
          )}
        >
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  );
};
