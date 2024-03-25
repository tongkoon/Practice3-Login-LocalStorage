// import './App.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminPage from "./page/Admin";
import LoginPage from "./page/Login";
import RootPage from "./page/Root";
import UserPage from "./page/User";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        { path: "/", element: <LoginPage /> },
        { path: "/admin", element: <AdminPage /> },
        { path: "/user", element: <UserPage /> },
      ],
      errorElement:<RootPage/>
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
