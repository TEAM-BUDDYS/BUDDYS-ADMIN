export const DocumentReviewDetailSkeleton = () => {
  return (
    <div
      aria-label="서류 인증 요청 상세 정보를 불러오는 중"
      aria-live="polite"
      className="flex flex-col gap-4 px-4 pt-[22px]"
      role="status"
    >
      <div aria-hidden className="flex h-[27px] items-center justify-between">
        <div className="flex items-center gap-[9px]">
          <div className="animate-skeleton-wave h-6 w-16 rounded-sm bg-gray-100" />
          <div className="animate-skeleton-wave h-3.5 w-20 rounded-sm bg-gray-100" />
        </div>
        <div className="animate-skeleton-wave h-5 w-11 rounded-sm bg-gray-100" />
      </div>

      <div
        aria-hidden
        className="animate-skeleton-wave h-13 rounded-xl bg-gray-100"
      />

      <div aria-hidden className="flex flex-col gap-4">
        <div className="animate-skeleton-wave h-[23px] w-18 rounded-sm bg-gray-100" />
        <div className="animate-skeleton-wave h-20 rounded-xl bg-gray-100" />
      </div>
    </div>
  );
};
