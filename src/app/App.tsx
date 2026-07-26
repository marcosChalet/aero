import {
  BrowserRouter,
  Route,
  Routes,
  type RouteObject,
} from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";

import "./App.css";
import Loading from "../shared/presentation/components/ui/Loading";

function renderRoutes(routes: RouteObject[]) {
  return routes.map((route, i) => (
    <Route key={i} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>{renderRoutes(routes)}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}
