import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootRoute from './routers/RootRoute'
import HomeRoute from './routers/HomeRoute'
import NotFoundRoute from './routers/NotFoundRoute'
import RepositoriesSearchRoute from './routers/RepositoriesSearchRoute'
import EditorRoute from './routers/EditorRoute'
import SignUpRoute from './routers/SignUpRoute'
import SignInRoute from './routers/SignInRoute'
import SignOutRoute from './routers/SignOutRoute'
import TestRoute from './routers/TestRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    children: [
      {
        path: 'test',
        element: <TestRoute />,
      },
      {
        path: 'signout',
        element: <SignOutRoute />,
      },
      {
        path: 'signup',
        element: <SignUpRoute />,
      },
      {
        path: 'signin',
        element: <SignInRoute />,
      },
      {
        path: '',
        element: <HomeRoute />,
      },
      {
        path: 'repositories/:owner/:repoName/*',
        element: <EditorRoute />,
      },
      {
        path: 'repositories',
        element: <RepositoriesSearchRoute />,
      },
      {
        path: '*',
        element: <NotFoundRoute />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
