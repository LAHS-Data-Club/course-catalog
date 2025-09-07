import { useParams } from "react-router-dom";
import { inviteOptions } from "../../functions/queryOptions";
import { useQuery } from "@tanstack/react-query";

export default function AcceptInvitePage() {
  const { id } = useParams();
  const inviteQuery = useQuery(inviteOptions(id as string));
  console.log(inviteQuery.data)

  return (
    <div>
      placeholder
    </div>
  );
}