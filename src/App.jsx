// eslint-disable-next-line no-unused-vars
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FrontPageGenerator from "./Components/Main";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <FrontPageGenerator />,

  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
