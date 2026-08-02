import { useUser } from "@/features/authentication/hooks/useUser.js";

import SimpleLoginPrompt from "./LoginPrompt.js";
import Spinner from "./Spinner.js";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { user, isLoading, isError } = useUser();
  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !user) {
    return <SimpleLoginPrompt />;
  }

  return children;
}

export default ProtectedRoute;
