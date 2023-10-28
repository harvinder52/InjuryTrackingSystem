import { useUser } from "@auth0/nextjs-auth0/client";
import { BodyPartsProvider } from "../BodyPartsContext";

import { Button } from "antd";

import HumanBodyMap from "./components/HumanBodyMap";
import CircleDrawer from "./components/CircleDrawer";
import InjuryReportForm from "./components/InjuryReportForm";

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <BodyPartsProvider>
        <div className="p-8">
          <p className="text-2xl font-bold mb-4">Welcome {user.name}!</p>
          <a
            href="/api/auth/logout"
            className="text-blue-500 underline hover:text-blue-700 inline-block mb-4"
          >
            Logout
          </a>

          <InjuryReportForm user={user.name} />
        </div>
      </BodyPartsProvider>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
