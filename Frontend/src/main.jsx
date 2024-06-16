import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home, Login, Signup, Polls, CreatePoll, UserProfile, ErrorPage } from './pages/index';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './layouts/PrivateRoute.jsx';
import RoleBasedRoute from './layouts/RoleBasedRoute.jsx';

const routes = createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={
      <AuthContext.Consumer>
        {({ isAuthenticated }) =>
          isAuthenticated ? <Navigate to="/" /> : <Login />
        }
      </AuthContext.Consumer>
    } />
    <Route path="/signup" element={
      <AuthContext.Consumer>
        {({ isAuthenticated }) =>
          isAuthenticated ? <Navigate to="/" /> : <Signup />
        }
      </AuthContext.Consumer>}
    />
    <Route path="/user-profile" element={<PrivateRoute />}>
      <Route index element={<UserProfile />} />
    </Route>
    <Route path="/all-polls" element={<PrivateRoute />}>
      <Route index element={<Polls />} />
    </Route>
    <Route path="/create-poll" element={<RoleBasedRoute allowedRoles={['Institute']} />}>
      <Route index element={<CreatePoll />} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Route>
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
