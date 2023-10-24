import { useUser } from "@auth0/nextjs-auth0/client";
import { BodyPartsProvider } from "../BodyPartsContext";

import { Button } from "antd";

import HumanBodyMap from "./components/HumanBodyMap";
import CircleDrawer from "./components/CircleDrawer";

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <BodyPartsProvider>
        <div>
          Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
          <Button type="primary">Primary Button</Button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HumanBodyMap />
            <CircleDrawer
              style={{
                border: "2px solid red",
                position: "absolute",
                top: "0",
              }}
            />
          </div>
        </div>
      </BodyPartsProvider>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
