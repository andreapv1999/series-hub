
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container" role="alert">
      <AlertCircle size={38} className="error-icon" />

      <h2>¡Vaya! Algo ha salido mal</h2>

      <p>
        {message || 'No hemos podido cargar la información.'}
      </p>

      {onRetry && (
        <button
          type="button"
          className="retry-button"
          onClick={onRetry}
        >
          <RefreshCw size={17} />
          Intentar de nuevo
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
