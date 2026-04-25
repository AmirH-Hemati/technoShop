import { useUser } from "../features/authentication/hooks/useUser.js";
import LoginPrompt from "./LoginPrompt.js";
import Spinner from "./Spinner.js";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useUser();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user && !isAuthenticated) {
    return <LoginPrompt />;
  }

  return children;
};

export default ProtectedRoute;
