import { useNavigate, useParams } from "react-router-dom";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";
import { inviteOptions, userOptions } from "../../functions/queryOptions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptInvite } from "../../functions/api";

export default function AcceptInvitePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inviteQuery = useQuery(inviteOptions(id));
  const userQuery = useQuery(userOptions());
  const inviteMutation = useMutation({
    mutationFn: (groupId: string) => acceptInvite(groupId),
    onSettled: () => navigate("/schedule-sharing")
  });

  if (inviteQuery.isPending || userQuery.isPending) return <p>Loading...</p>;
  if (inviteQuery.isError || userQuery.isError) return <p>Error...</p>;
  
  const signedIn = !!userQuery.data;

  function handleAcceptInvite() {
    if (signedIn) {
      inviteMutation.mutate(id);
    } else {
      const redirect = encodeURIComponent(window.location.href);
      window.location.href = `/api/login?redirect=${redirect}`;
    }
  }

  // console.log(inviteQuery.data)

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex px-10 py-15 w-100 drop-shadow-xl rounded border shadow-xl border-slate-700 bg-slate-800">
        {inviteQuery.data ? (
          <div className="flex flex-col justify-center items-center gap-3">
            <TbFaceId size={75} className="text-slate-500" />
            <p className="text-slate-300 mb-1 text-center">
              {inviteQuery.data.inviter_name} ({inviteQuery.data.inviter_email}) invites you to join
            </p>
            <p className="text-2xl font-bold text-slate-200 mb-4">
              {inviteQuery.data.group_title}
            </p>
            <hr className="text-slate-500 w-full mb-4" />
            <button 
              disabled={inviteMutation.isPending} 
              className="w-60 font-semibold cursor-pointer bg-blue-500 px-4 py-2 rounded shadow-md hover:bg-blue-500/70 transition"
              onClick={handleAcceptInvite}
            >
              {!signedIn ? "Sign in to accept invite" : inviteMutation.isPending ? "Accepting..." : "Accept invite"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-3">
            <TbFaceIdError size={75} className="text-slate-500" />
            <p className="text-2xl font-bold text-slate-200 mb-1">Invite not found</p>
            <p className="text-slate-300 mb-4">This invite may be expired, revoked, or invalid.</p>
            <hr className="text-slate-500 w-full mb-4" />
            <button 
               className="w-60 font-semibold cursor-pointer bg-blue-500 px-4 py-2 rounded shadow-md hover:bg-blue-500/70 transition"
              onClick={() => navigate("/")}
            >
              Return to home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
