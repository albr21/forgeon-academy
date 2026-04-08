var APP = (window as any).APP;

interface ToastData {
  id: number;
  type: 'xp' | 'achievement' | 'success' | 'error';
  title: string;
  description?: string;
  icon: string;
}

function useToasts() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = ++APP.toastIdCounter;
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

APP.useToasts = useToasts;
