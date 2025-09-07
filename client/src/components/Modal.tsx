import { HiX } from "react-icons/hi";
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ 
  open,
  onClose,
  className,
  ...props
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel className="p-8 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl rounded border shadow-xl border-slate-700 bg-slate-800">
          <div className={className}>
            {props.children}
          </div>
          <button 
            aria-label="Close" 
            className="fixed right-3 top-3 cursor-pointer" 
            onClick={onClose}
          >
            <HiX size={20} />
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
