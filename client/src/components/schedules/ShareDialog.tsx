import Modal from "../Modal";
import React, { useContext, useRef, useState } from "react";
import { Fieldset, Label, Legend, Select, Field } from '@headlessui/react'
import { FaChevronDown } from "react-icons/fa";
import { UserContext } from "../../contexts/UserContext";
import { createInvite } from "../../functions/api";
import { useMutation } from "@tanstack/react-query";
import { DateTime } from "luxon";

interface Props {
  open: boolean;
  onClose: () => void;
  groupId: string,
}

const expiryOptions = {
  "30 minutes": { minutes: 30 },
  "1 hour": { hours: 1 },  
  "6 hours": { hours: 6 },  
  "12 hours": { hours: 12 },  
  "1 day": { days: 1 },  
  "1 week": { weeks: 1 },
  "Never": null
};

export default function ShareDialog({ 
  open,
  onClose,
  groupId
}: Props) { 
  const { userQuery } = useContext(UserContext);
  const [copied, setCopied] = useState(false); // for copied alert
  const linkRef = useRef<HTMLInputElement>(null);
  const inviteMutation = useMutation({
    mutationFn: (expiry: DateTime) => {
      return createInvite(userQuery.data.id, groupId, expiry);
    }
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = (e.target as HTMLFormElement).expiry.value;
    const expiry = DateTime.now().plus(expiryOptions[val]);
    inviteMutation.mutate(expiry);
  }

  function copyLink() {
    if (linkRef.current !== null) {
      linkRef.current.select();
      navigator.clipboard.writeText(linkRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <Modal onClose={onClose} open={open} className="min-h-50 min-w-100 max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="max-w-100 space-y-4 h-60 flex flex-col justify-center"
      >
        <Fieldset>
          <Legend className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Generate an invite link
          </Legend>
          <Field className="">
            <Label className="block mb-2">Expire after:</Label>
            <div className="relative">
              <Select 
                id="expiry"
                name="expiry"
                className="w-full flex-1 rounded border p-2.5 px-4 pr-10 appearance-none border-slate-700 bg-slate-800 text-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {Object.keys(expiryOptions).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </Select>
              {/** Arrow styling */}
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <FaChevronDown className="text-slate-400" size={13} />
              </span>
            </div>
          </Field>
        </Fieldset>

        {/** Generated link */}
        {inviteMutation.data && (
          <div className="flex">
            <input
              readOnly
              ref={linkRef}
              type="text"
              value={inviteMutation.data ?? ""}
              className="w-full px-4 py-2.5 flex-1 rounded-l border border-slate-700 focus:outline-none"
            />
            <button
              type="button"
              onClick={copyLink}
              className={`${copied ? "bg-emerald-600" : "bg-slate-700"} cursor-pointer w-25 rounded-r border border-slate-700`}    
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={inviteMutation.isPending}
          className="w-full cursor-pointer rounded border p-2.5 px-4 border-slate-700 bg-slate-800 hover:bg-slate-600 transition text-slate-200"
        >
          {inviteMutation.isPending ? "Generating..." : "Generate Link"}
        </button> 
      </form>
    </Modal>
  );
}