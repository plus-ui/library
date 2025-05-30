// Remove import for ToastOptions from toast-container

// Define and export ToastOptions and ActiveToast here

// Type for the listener callback
type ToastListener = (toasts: ActiveToast[]) => void;

// Define and export types locally first
export type SizeType = 'sm' | 'md' | 'lg';
export type StatusType = 'info' | 'success' | 'warning' | 'danger' | 'default';
export type PositionType =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

// Define and export options interface
export interface ToastOptions {
  message: string;
  header?: string;
  status?: StatusType;
  duration?: number;
  icon?: string;
  kind?: 'filled' | 'outlined';
  size?: SizeType;
  position?: PositionType;
  invert?: boolean;
  dismiss?: boolean;
  statusIcon?: boolean;
}

export interface ActiveToast extends ToastOptions {
  id: string;
  position: PositionType;
}

class ToastServiceController {
  private toasts: ActiveToast[] = [];
  private listeners: Set<ToastListener> = new Set();
  private toastCounter = 0;

  // Method to add a listener (e.g., the toast container)
  subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    listener(this.toasts); // Immediately provide the current state
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notify all listeners about changes
  private notify() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }

  /**
   * Displays a toast message.
   * @param options - Configuration for the toast.
   * @returns The ID of the created toast.
   */
  show(options: ToastOptions): string {
    const id = `toast-${this.toastCounter++}`;
    const duration = options.duration ?? 5000;
    const position = options.position ?? 'top-right';

    const newToast: ActiveToast = {
      ...options,
      id,
      duration,
      position,
    };

    this.toasts = [...this.toasts, newToast];
    this.notify();

    // Auto-close timer
    if (duration > 0 && duration !== Infinity) {
      setTimeout(() => {
        this.close(id);
      }, duration);
    }

    return id;
  }

  /**
   * Closes a specific toast by its ID.
   * @param id - The ID of the toast to close.
   */
  close(id: string): void {
    const initialLength = this.toasts.length;
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    if (this.toasts.length < initialLength) {
      this.notify();
    }
  }

  /**
   * Closes all active toasts.
   */
  closeAll(): void {
    if (this.toasts.length > 0) {
      this.toasts = [];
      this.notify();
    }
  }

  // We might need methods to pause/resume timers later if hover effects are desired,
  // but the container can handle hover detection and call close(id) via events for now.
}

// Export a singleton instance
export const ToastService = new ToastServiceController();
