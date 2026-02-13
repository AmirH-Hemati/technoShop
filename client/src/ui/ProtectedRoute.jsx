import { useUser } from "../features/authentication/useUser";
import LoginPrompt from "./LoginPrompt";
import Spinner from "./Spinner";

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
