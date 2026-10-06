import type { ReactNode } from 'react';

import { cn } from '../utils/cn';
import { ChevronLeftIcon } from './icons';

type HeaderContentAlign = 'left' | 'center';

interface HeaderBaseProps {
  content?: ReactNode;
  right?: ReactNode;
  contentAlign?: HeaderContentAlign;
  className?: string;
}

type HeaderProps = HeaderBaseProps &
  (
    | {
        hasBackButton: true;
        onBackClick: () => void;
      }
    | {
        hasBackButton?: false;
        onBackClick?: never;
      }
  );

export const Header = ({
  content,
  right,
  hasBackButton = false,
  contentAlign = 'left',
  onBackClick,
  className,
}: HeaderProps) => {
  const contentNode =
    typeof content === 'string' ? (
      <h1 className="text-title-b-20 text-gray-800">{content}</h1>
    ) : (
      content
    );

  return (
    <header
      className={cn(
        'relative flex h-15 w-full items-center bg-white pr-4 pl-5',
        className,
      )}
    >
      {hasBackButton && (
        <button
          aria-label="뒤로가기"
          className="-ml-3 flex size-11 shrink-0 items-center justify-center text-gray-800"
          type="button"
          onClick={onBackClick}
        >
          <ChevronLeftIcon className="shrink-0" width={24} height={24} />
        </button>
      )}
      <div
        className={cn(
          'min-w-0',
          contentAlign === 'center'
            ? 'pointer-events-none absolute left-1/2 -translate-x-1/2'
            : 'flex flex-1 items-center justify-start',
        )}
      >
        {contentNode}
      </div>
      {right && (
        <div className="ml-auto flex shrink-0 items-center justify-end gap-5">
          {right}
        </div>
      )}
    </header>
  );
};
