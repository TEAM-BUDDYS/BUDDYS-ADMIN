import { cn } from '../../../shared/utils/cn';
import type { DocumentReviewFilter } from '../types/documentReview.types';

interface DocumentReviewFiltersProps {
  selectedFilter: DocumentReviewFilter;
  onFilterChange: (filter: DocumentReviewFilter) => void;
}

const FILTER_OPTIONS: ReadonlyArray<{
  label: string;
  value: DocumentReviewFilter;
}> = [
  { label: '전체', value: 'all' },
  { label: '대기중', value: 'pending' },
  { label: '승인', value: 'approved' },
  { label: '반려', value: 'rejected' },
];

export const DocumentReviewFilters = ({
  selectedFilter,
  onFilterChange,
}: DocumentReviewFiltersProps) => {
  return (
    <div
      aria-label="서류 인증 상태 필터"
      className="mt-3 px-4 py-1"
      role="group"
    >
      <ul className="flex gap-2">
        {FILTER_OPTIONS.map(({ label, value }) => {
          const isSelected = selectedFilter === value;

          return (
            <li key={value}>
              <button
                aria-pressed={isSelected}
                className={cn(
                  'text-body-r-14 focus-visible:outline-mint-300 flex shrink-0 items-center justify-center rounded-full border px-4 py-2 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2',
                  isSelected
                    ? 'text-body-sb-14 border-gray-800 bg-gray-800 text-white'
                    : 'border-gray-100 bg-white text-gray-500',
                )}
                type="button"
                onClick={() => onFilterChange(value)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
