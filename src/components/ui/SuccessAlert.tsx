import { CheckCircle, X } from 'lucide-react';

interface SuccessAlertProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export function SuccessAlert({ message, onClose, className = '' }: SuccessAlertProps) {
  return (
    <div className={`p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-start gap-3 ${className}`}>
      <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
      <p className="flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-green-100 rounded transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
