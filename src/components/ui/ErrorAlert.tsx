import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export function ErrorAlert({ message, onClose, className = '' }: ErrorAlertProps) {
  return (
    <div className={`p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-3 ${className}`}>
      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
      <p className="flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-red-100 rounded transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
