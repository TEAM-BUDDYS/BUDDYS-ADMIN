interface DocumentReviewListSkeletonProps {
  count?: number;
}

export const DocumentReviewListSkeleton = ({
  count = 5,
}: DocumentReviewListSkeletonProps) => {
  return (
    <ul aria-hidden className="mt-3.5 flex flex-col gap-3">
      {Array.from({ length: count }, (_, index) => (
        <li className="flex h-[59px] items-center px-4 py-[7px]" key={index}>
          <div className="flex h-[45px] w-full items-center justify-between gap-4">
            <div className="flex flex-1 flex-col gap-[7px]">
              <div className="animate-skeleton-wave h-5 w-18 rounded-sm bg-gray-100" />
              <div className="animate-skeleton-wave h-3.5 w-20 rounded-sm bg-gray-100" />
            </div>
            <div className="animate-skeleton-wave h-5 w-11 rounded-sm bg-gray-100" />
          </div>
        </li>
      ))}
    </ul>
  );
};
