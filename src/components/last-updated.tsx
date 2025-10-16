interface LastUpdatedProps {
  date: string; // ISO format date
  showIcon?: boolean;
}

export function LastUpdated({ date, showIcon = false }: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="text-center text-xs text-gray-500">
      <span className="font-bold">
        Last updated: {formattedDate}
      </span>
    </div>
  );
}

