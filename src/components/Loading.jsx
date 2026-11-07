
import { LoaderCircle } from 'lucide-react';

const Loading = ({ message = 'Cargando series...' }) => {
  return (
    <div
      className="loading-container"
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className="loading-spinner"
        size={42}
        strokeWidth={2}
        aria-hidden="true"
      />

      <p>{message}</p>
    </div>
  );
};

export default Loading;
