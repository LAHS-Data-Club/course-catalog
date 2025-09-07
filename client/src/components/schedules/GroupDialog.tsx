import { useClose } from "@headlessui/react";
import Modal from "../Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void
}

// TODO: sanitization
export default function GroupDialog({ 
  open, 
  onClose,
  onSubmit,
}: Props) { 
  const close = useClose();
  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-xl font-boldtext-slate-200 mb-4">Create a new group</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // TODO: i forgot the point of this lol
          onSubmit(e);
          close();
        }}
        className="flex gap-4 items-center"
      > 
        <label htmlFor="name" className="sr-only">Group Name:</label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Enter group name..."
          className="min-w-70 flex-1 rounded border p-2.5 px-4 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 border-slate-700 bg-slate-800 text-slate-200"
        />
        <button
          type="submit"
          className="cursor-pointer max-w-30 flex-1 rounded border p-2.5 px-4 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 border-slate-700 bg-slate-800 text-slate-200"
        >
          Create
        </button> 
      </form>
    </Modal>
  );
}