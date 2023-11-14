import React from "react";
import { Card, Divider } from "antd";
import { useAuth } from "react-oidc-context";

import jwt_decode from "jwt-decode";
export default function Token() {
  const auth = useAuth();
  if (!auth.isAuthenticated) return <></>;

  const decodedIdToken = jwt_decode(auth.user!.id_token!) as object;
  const decodedAccessToken = jwt_decode(auth.user!.access_token!) as object;

  return (
    <Card>
      <h3> Hello {auth.user?.profile.sub}</h3>
      <Divider />
      <div>Access Token Claims: </div>
      <div>
        <pre>{JSON.stringify(decodedAccessToken, null, 2)}</pre>
      </div>
      <Divider />
      <div>ID Token Claims: </div>
      <div>
        <pre>{JSON.stringify(decodedIdToken, null, 2)}</pre>
      </div>

      <Divider />
      <div> Access Token</div>
      <div> {auth.user?.access_token}</div>
      <Divider />
      <div> ID Token</div>
      <div> {auth.user?.id_token}</div>
    </Card>
  );
}
