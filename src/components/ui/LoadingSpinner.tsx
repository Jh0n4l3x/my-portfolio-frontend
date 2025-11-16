interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  centered?: boolean;
}

export function LoadingSpinner({ size = 'md', text, centered = true }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const spinner = (
    <>
      <div
        className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`}
      ></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </>
  );

  if (centered) {
    return <div className="flex flex-col items-center justify-center h-64">{spinner}</div>;
  }

  return <div className="flex flex-col items-center">{spinner}</div>;
}
