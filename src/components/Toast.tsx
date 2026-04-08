interface ToastData {
  id: number;
  type: 'xp' | 'achievement' | 'success' | 'error';
  title: string;
  description?: string;
  icon: string;
}

function ToastContainer({ toasts, onRemove }: { toasts: ToastData[]; onRemove: (id: number) => void }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }: { toast: ToastData; onRemove: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id]);

  return (
    <div className={`toast ${toast.type}`}>
      <span className="toast-icon">{toast.icon}</span>
      <div className="toast-content">
        <div className="toast-title">{toast.title}</div>
        {toast.description && <div className="toast-desc">{toast.description}</div>}
      </div>
    </div>
  );
}

var APP = (window as any).APP;
APP.ToastContainer = ToastContainer;
