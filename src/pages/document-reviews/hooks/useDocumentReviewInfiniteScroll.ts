import { useEffect, useRef } from 'react';

interface UseDocumentReviewInfiniteScrollParams {
  enabled: boolean;
  onLoadMore: () => void;
}

export const useDocumentReviewInfiniteScroll = ({
  enabled,
  onLoadMore,
}: UseDocumentReviewInfiniteScrollParams) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!enabled || !sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: '160px 0px' },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onLoadMore]);

  return sentinelRef;
};
