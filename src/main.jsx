import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import ShowCreators from "./pages/ShowCreators.jsx";
import AddCreator from "./pages/AddCreator.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<ShowCreators />} />
      <Route path="new" element={<AddCreator />} />
      <Route path="creators/:id" element={<ViewCreator />} />
      <Route path="creators/edit/:id" element={<EditCreator />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
