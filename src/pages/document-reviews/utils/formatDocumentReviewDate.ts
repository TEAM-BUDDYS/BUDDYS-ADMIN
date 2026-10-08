const documentReviewDateFormatter = new Intl.DateTimeFormat('ko-KR', {
  day: '2-digit',
  month: '2-digit',
  timeZone: 'Asia/Seoul',
  year: 'numeric',
});

export const formatDocumentReviewDate = (submittedAt: string) => {
  const dateParts = Object.fromEntries(
    documentReviewDateFormatter
      .formatToParts(new Date(submittedAt))
      .map(({ type, value }) => [type, value]),
  );

  return `${dateParts.year}.${dateParts.month}.${dateParts.day}`;
};
