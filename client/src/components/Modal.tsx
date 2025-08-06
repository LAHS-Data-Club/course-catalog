import { HiX } from "react-icons/hi";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

// TODO: dialog
export default function Modal({ children, onClose }: Props) {
   return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <div 
        className="max-w-2xl w-full max-h-[80vh] overflow-y-auto drop-shadow-xl rounded border border-slate-300 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800" 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 cursor-pointer"
        >
          <HiX size={20} />
        </button>
        <div className="p-7">
          {children}
        </div>
      </div>
    </div>
  );
}