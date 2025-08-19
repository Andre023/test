import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EventForm from "../components/events/EventForm";
import SalesList from "../components/sales/SalesList";
import SaleForm from "../components/sales/SaleForm";
import UserList from "../components/users/UserList";
import CreateUserForm from "../components/users/CreateUserForm";
import UpdateUserForm from "../components/users/UpdateUserForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <SalesList /> },
      { path: "/events/new", element: <EventForm /> },
      { path: "/sales/new", element: <SaleForm /> },
      { path: "/users", element: <UserList /> },
      { path: "/users/new", element: <CreateUserForm /> },
      { path: "/users/update/:id", element: <UpdateUserForm /> },
    ],
  },
]);