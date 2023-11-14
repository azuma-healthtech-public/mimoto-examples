import { Routes, Route, Outlet, Link } from "react-router-dom";
import React from "react";
import { Card } from "antd";
import Oidc from "./examples/Oidc";
import { exampleConfigs, ExampleOidcConfig } from "./config/OidcConfig";

export default function App() {
  return (
    <Card>
      <h1>Basic OIDC Examples</h1>

      <p>
        These examples demonstrate OIDC integrations with <b>azuma mimoto</b>
      </p>

      <Routes>
        <Route path="/" element={<Layout />}>
          {exampleConfigs.map((config: ExampleOidcConfig) => (
            <>
              <Route
                path={`/${config.path}`}
                element={<Oidc config={config} />}
              />
              <Route
                path={`/oidc/signin/${config.path}`}
                element={<Oidc config={config} />}
              />
            </>
          ))}

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Card>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {exampleConfigs.map((config: ExampleOidcConfig) => (
            <li key={config.path}>
              <Link to={`/${config.path}`}>{config.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
