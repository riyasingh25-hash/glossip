import React from 'react';
import { useCart } from '../context/CartContext';
import { X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#242124] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 border border-white/10 text-xs font-semibold animate-in slide-in-from-bottom-2 fade-in duration-200"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#F32F68] text-sm">✦</span>
            <span>{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/60 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
