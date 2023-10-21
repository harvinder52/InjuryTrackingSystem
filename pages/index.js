import { useUser } from "@auth0/nextjs-auth0/client";

import HumanBodyMap from "./components/HumanBodyMap";
import ThreeDModelViewer from "./components/3dhumanbody";

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        <HumanBodyMap />
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
