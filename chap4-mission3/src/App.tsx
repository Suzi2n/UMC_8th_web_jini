
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomeLayout from './layouts/HomeLayout';
import Mypage from './pages/Mypage';

const router = createBrowserRouter([

  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignUpPage />},
      {path: 'my', element: <Mypage />},

    ],
  },
]);


function App() {

  return <RouterProvider router={router} />;

}

export default App
