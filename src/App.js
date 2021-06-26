import { lazy, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import routes, { requireLogin } from "./routes";
import "./App.css";

const NotFound = lazy(() => import("./pages/NotFound"));
const Loading = lazy(() => import("./pages/Loading"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GuardProvider
          guards={[requireLogin]}
          loading={Loading}
          error={NotFound}
        >
          <Suspense fallback={null}>
            <Switch>
              {routes.map((props) => {
                return <GuardedRoute exact {...props} />;
              })}
            </Switch>
          </Suspense>
        </GuardProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
