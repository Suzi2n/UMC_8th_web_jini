
import './App.css'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomeLayout from './layouts/HomeLayout';
import Mypage from './pages/Mypage';
import { AuthProvider } from './context/AuthContext';
import ProtextedLayout from './layouts/ProtectedLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LpDetailPage from './pages/LpDetailPage';
import ThrottlePage from './pages/ThrottlePage';


// publicRoutes: 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignUpPage />},
      // {path:'v1/auth/google/callback', element: <GoogleLoginRedirectPage/>}
      {path: 'Lps/:lpId', element: <LpDetailPage/>},
      {path: "throttle", element: <ThrottlePage />}
    ],
  },
];

// protextedRoutes: 인증이 필요한 라우트

const protextedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtextedLayout/>,
    errorElement: <NotFoundPage />,
    children: [
      {path: 'my', element: <Mypage/>},
    ],

  },
]

const router = createBrowserRouter([...publicRoutes, ...protextedRoutes]);

export const queryClient = new QueryClient( {
  defaultOptions: {
    queries: {
      retry: 3
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} /> }
    </QueryClientProvider>
  );

}

export default App;
