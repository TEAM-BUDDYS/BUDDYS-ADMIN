import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '../utils/cn';
import { buttonVariants } from './buttonVariants';

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
