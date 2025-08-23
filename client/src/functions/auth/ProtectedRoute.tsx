import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";


export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { userQuery } = useContext(UserContext);
  
  if (userQuery.isLoading) return <p>Loading...</p>;

  if (!userQuery.data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        like make it fancy and nicee looking lol
        have a button that redirects to sign in page
      </div>
    );
  }

  return children;
};